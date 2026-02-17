import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { RoleDetails, UpsertRoleDetails } from '@ospk/web-models/clients'

// GET /api/v1/admin/clients/roles
type ListRolesRequest = RequestHandler<any, ApiResponse<RoleDetails[]>>
export const listRoles: ListRolesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        label: true,
      }
    })

    res.json({
      error: false,
      data: roles,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/clients/roles/:id
type GetRoleRequest = RequestHandler<IdParams, ApiResponse, UpsertRoleDetails>
export const getRole: GetRoleRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const role = await prisma.role.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        name: true,
        label: true,
      },
    })

    res.json({
      error: false,
      data: role,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/clients/roles/:id?
type UpsertRoleRequest = RequestHandler<IdParams, ApiResponse, UpsertRoleDetails>
export const upsertRole: UpsertRoleRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.role.update({
        where: { id: req.params.id },
        data: req.body,
      })
    } else {
      await prisma.role.create({
        data: req.body,
      })
    }

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/clients/roles/:id
type DeleteRoleRequest = RequestHandler<IdParams, ApiResponse>
export const deleteRole: DeleteRoleRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.role.delete({
      where: { id: req.params.id },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
