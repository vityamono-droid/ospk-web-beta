import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { ClientDetails, ListClientDetailsQuery, UpsertClientDetails } from '@ospk/web-models/clients'

// GET /api/v1/admin/clients
type ListClientsRequest = RequestHandler<any, ApiResponse<ClientDetails[]>, any, ListClientDetailsQuery>
export const listClients: ListClientsRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const roleRule =
      req.query.type === 'STAFF'
        ? {
            some: {},
          }
        : {
            none: {},
          }

    const clients = await prisma.user.findMany({
      where: {
        roles: roleRule,
        lastName: req.query.lastName,
        phone: req.query.phone,
        email: req.query.email,
        id: {
          not: req.session.userId,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        phone: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        removedAt: true,
      },
      take: +req.query.limit,
      skip: +req.query.offset,
    })

    res.json({
      error: false,
      data: clients,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/clients/:id
type GetClientRequest = RequestHandler<IdParams, ApiResponse<UpsertClientDetails>>
export const getClient: GetClientRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const client = await prisma.user.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        firstName: true,
        lastName: true,
        patronymic: true,
        avatar: true,
        phone: true,
        email: true,
        removedAt: true,
        roles: {
          select: { id: true },
        },
      },
    })

    res.json({
      error: false,
      data: {
        ...client,
        roles: client.roles.map(item => item.id),
      },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/clients/:id?
type UpsertClientRequest = RequestHandler<IdParams, ApiResponse, UpsertClientDetails>
export const upsertClient: UpsertClientRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const { password, roles, ...client } = req.body

    if (!!req.params.id) {
      await prisma.user.update({
        where: { id: req.params.id },
        data: {
          ...client,
          avatar: req.body.avatar == null ? null : req.file?.path,
          roles: {
            set: roles.map((item) => ({ id: item })),
          },
        },
      })
    } else {
      const hash = password ? res.locals.hasher.generate(password) : undefined
      await prisma.user.create({
        data: {
          ...client,
          avatar: req.file?.path,
          roles: {
            connect: roles.map((item) => ({ id: item })),
          },
          password: hash!,
        },
      })
    }

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/clients/:id
type DeleteClientRequest = RequestHandler<IdParams, ApiResponse>
export const deleteClient: DeleteClientRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const client = await prisma.user.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.user.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!client.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
