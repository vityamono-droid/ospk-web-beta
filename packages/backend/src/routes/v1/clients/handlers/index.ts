import { ApiResponse } from '@ospk/web-models';
import { RequestHandler } from 'express';
import type { ListRequest} from '@ospk/web-models/clients'

export const listClients: RequestHandler<any, ApiResponse, any, ListRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const clients = await prisma.client.findMany({
      where: {
        label: {
          contains: req.query.label,
          mode: 'insensitive',
        }

      },
      skip: req.query.offset,
      take: req.query.limit,
    })

    res.json({
      error: false,
    })
  } catch(err) {
    next(err)
  }
}

export const getClient: RequestHandler = async (req, res, next) => {
  try {
    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const addClient: RequestHandler = async (req, res, next) => {
  try {
    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const updateClient: RequestHandler = async (req, res, next) => {
  try {
    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const updateClientList: RequestHandler = async (req, res, next) => {
  try {
    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteClient: RequestHandler = async (req, res, next) => {
  try {
    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
