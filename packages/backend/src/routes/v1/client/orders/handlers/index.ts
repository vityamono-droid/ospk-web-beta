import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { OrderData, UpsertOrderData } from '@ospk/web-models/orders'

type ListOrdersRequest = RequestHandler<any, ApiResponse<OrderData[]>>
export const listOrders: ListOrdersRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const orders = await prisma.order.findMany({
      where: { profileId: req.session.user?.profileId! },
      select: {
        id: true,
        status: true,
        createdAt: true,
        department: {
          select: {
            address: true,
          },
        },
        services: {
          select: {
            price: true,
            amount: true,
            service: {
              select: {
                id: true,
                label: true,
                banner: true,
              },
            },
          },
        },
      },
    })

    res.json({
      error: false,
      data: orders.map((item) => ({
        ...item,
        services: undefined,
        department: item.department.address.substring(0, item.department.address.indexOf(',')),
        serviceId: item.services[0].service.id,
        label: item.services[0].service.label,
        banner: item.services[0].service.banner,
        price: item.services[0].price,
        amount: item.services[0].amount,
      })),
    })
  } catch (err) {
    next(err)
  }
}

type UpsertOrdersRequest = RequestHandler<IdParams, ApiResponse, UpsertOrderData>
export const upsertOrder: UpsertOrdersRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      const upserted = await prisma.order.update({
        where: { id: req.params.id },
        data: { status: 'REJECTED' },
        select: { departmentId: true, services: { select: { amount: true, serviceId: true } } },
      })

      const department = await prisma.serviceDepartment.findFirstOrThrow({
        where: { serviceId: upserted.services[0].serviceId, departmentId: upserted.departmentId },
        select: { id: true, available: true },
      })

      if (department.available != null) {
        await prisma.serviceDepartment.update({
          where: { id: department.id },
          data: { available: department.available + (upserted.services[0].amount ?? 1) },
        })
      }
    } else {
      const service = await prisma.service.findUniqueOrThrow({
        where: { id: req.body.serviceId },
        select: { price: true, amountType: true },
      })

      const department = await prisma.serviceDepartment.findFirstOrThrow({
        where: { id: req.body.departmentId },
        select: { id: true, available: true, departmentId: true },
      })

      await prisma.order.create({
        data: {
          status: 'PENDING',
          departmentId: department.departmentId,
          profileId: req.session.user?.profileId!,
          services: {
            create: {
              amount: req.body.amount ?? 1,
              price: service.amountType === 'FINITE' ? req.body.amount! * service.price : service.price,
              discount: 0,
              serviceId: req.body.serviceId,
            },
          },
        },
      })

      if (department.available != null) {
        await prisma.serviceDepartment.update({
          where: { id: department.id },
          data: { available: department.available - (req.body.amount ?? 1) },
        })
      }
    }

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
