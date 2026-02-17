import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { EmployeeDetails, UpsertEmployeeDetails } from '@ospk/web-models/employees'

type ListEmployeesRequest = RequestHandler<any, ApiResponse<EmployeeDetails[]>>
export const listEmployees: ListEmployeesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        level: true,
        disabled: true,
        removedAt: true,
      },
    })

    res.json({
      error: true,
      data: employees,
    })
  } catch (err) {
    next(err)
  }
}

type GetEmployeeRequest = RequestHandler<IdParams, ApiResponse<UpsertEmployeeDetails>>
export const getEmployee: GetEmployeeRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const employee = await prisma.employee.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        firstName: true,
        lastName: true,
        patronymic: true,
        photo: true,
        level: true,
        departmentId: true,
        disabled: true,
        removedAt: true,
      },
    })

    res.json({
      error: true,
      data: employee,
    })
  } catch (err) {
    next(err)
  }
}

type UpsertEmployeeRequest = RequestHandler<IdParams, ApiResponse<string>, UpsertEmployeeDetails>
export const upsertEmployee: UpsertEmployeeRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    let newData
    if (!!req.params.id) {
      newData = await prisma.employee.update({
        where: { id: req.params.id },
        data: {
          ...req.body,
          photo: req.body.photo == null ? null : req.file?.path,
        },
      })
    } else {
      newData = await prisma.employee.create({
        data: {
          ...req.body,
          photo: req.file?.path,
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

type DeleteEmployeeRequest = RequestHandler<IdParams, ApiResponse>
export const deleteEmployee: DeleteEmployeeRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const employee = await prisma.employee.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.employee.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!employee.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: true,
    })
  } catch (err) {
    next(err)
  }
}
