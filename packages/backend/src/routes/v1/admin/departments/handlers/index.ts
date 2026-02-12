import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { DepartmentDetails, UpsertDepartmentDetails } from '@ospk/web-models/departments'

// GET /api/v1/admin/departments
type ListDepartmentsRequest = RequestHandler<any, ApiResponse<DepartmentDetails[]>>
export const listDepartments: ListDepartmentsRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const departments = await prisma.department.findMany()

    res.json({
      error: true,
      data: departments,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/departments/:id
type GetDepartmentRequest = RequestHandler<IdParams, ApiResponse<UpsertDepartmentDetails>>
export const getDepartment: GetDepartmentRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const department = await prisma.department.findUniqueOrThrow({
      where: { id: req.params.id },
      omit: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
      include: {
        contacts: {
          omit: { createdAt: true, updatedAt: true, departmentId: true },
        },
        schedules: {
          omit: { createdAt: true, updatedAt: true, departmentId: true },
        },
      },
    })

    res.json({
      error: true,
      data: department,
    })
  } catch (err) {
    next(err)
  }
}

// POST:PUT /api/v1/admin/departments/:id?
type UpsertDepartmentRequest = RequestHandler<IdParams, ApiResponse<string>, UpsertDepartmentDetails>
export const upsertDepartment: UpsertDepartmentRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    let newData
    if (!!req.params.id) {
      const { contacts, schedules, ...department } = req.body

      newData = await prisma.department.update({
        where: { id: req.params.id },
        data: {
          ...department,
          contacts: {
            set: contacts,
          },
          schedules: {
            set: schedules.map((item) => ({
              ...item,
              weekDays: {
                equals: item.weekDays,
              },
              customWeekDay: {
                equals: [],
              },
              departmentId: req.params.id,
            })),
          },
        },
      })
    } else {
      newData = await prisma.department.create({
        data: {
          ...req.body,
          contacts: {
            createMany: {
              data: req.body.contacts,
              skipDuplicates: true,
            },
          },
          schedules: {
            createMany: {
              data: req.body.schedules,
              skipDuplicates: true,
            },
          },
        },
      })
    }

    res.json({
      error: true,
      data: newData.id,
    })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/v1/admin/departments/:id
type DeleteDepartmentRequest = RequestHandler<IdParams, ApiResponse>
export const deleteDepartment: DeleteDepartmentRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const department = await prisma.department.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.department.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!department.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: true,
    })
  } catch (err) {
    next(err)
  }
}
