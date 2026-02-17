import { ApiResponse } from '@ospk/web-models'
import { RequestHandler, Router } from 'express'
import { DepartmentData } from '@ospk/web-models/departments'

const departmentsRouter = Router()

departmentsRouter.get('/', <RequestHandler<any, ApiResponse<DepartmentData[]>>>(async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const departments = await prisma.department.findMany({
      select: {
        address: true,
        maps: true,
        phone: true,
        email: true,
        contacts: {
          select: {
            type: true,
            phone: true,
            employee: {
              select: {
                firstName: true,
                lastName: true,
                patronymic: true,
                positions: {
                  where: {
                    primary: true
                  },
                  select: {
                    title: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        schedules: {
          select: {
            label: true,
            weekDays: true,
            timeStart: true,
            timeEnd: true,
          },
        },
      },
    })

    res.json({
      error: true,
      data: departments.map((department) => ({
        ...department,
        contacts: department.contacts.map((contact) => ({
          ...contact,
          employee: {
            ...contact.employee,
            positions: undefined,
            position: contact.employee.positions[0]?.title.label,
          },
        })),
      })),
    })
  } catch (err) {
    next(err)
  }
}))

export default departmentsRouter
