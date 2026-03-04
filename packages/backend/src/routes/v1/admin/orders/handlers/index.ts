import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { OrderDetails, UpsertOrderDetails } from '@ospk/web-models/orders'

type ListOrdersRequest = RequestHandler<any, ApiResponse<OrderDetails[]>>
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
                label: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json({
      error: false,
      data: orders.map((item) => ({
        ...item,
        services: undefined,
        department: item.department.address.substring(0, item.department.address.indexOf(',')),
        label: item.services[0].service.label,
        price: item.services[0].price,
        amount: item.services[0].amount,
      })),
    })
  } catch (err) {
    next(err)
  }
}

type UpsertOrderRequest = RequestHandler<IdParams, ApiResponse<string>, UpsertOrderDetails>
export const upsertOrder: UpsertOrderRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const upserted = await prisma.order.update({
      where: { id: req.params.id },
      data: req.body,
      select: { id: true, services: { select: { amount: true } } },
    })

    if (req.body.status === 'REJECTED') {
      const order = await prisma.order.findUniqueOrThrow({
        where: { id: req.params.id },
        select: {
          services: {
            select: { serviceId: true },
          },
          departmentId: true,
        },
      })

      const department = await prisma.serviceDepartment.findFirstOrThrow({
        where: { serviceId: order.services[0].serviceId, departmentId: order.departmentId },
        select: { id: true, available: true },
      })

      if (department.available != null) {
        await prisma.serviceDepartment.update({
          where: { id: department.id },
          data: { available: department.available + (upserted.services[0].amount ?? 1) },
        })
      }
    }

    res.json({
      error: false,
      data: upserted.id,
    })
  } catch (err) {
    next(err)
  }
}
