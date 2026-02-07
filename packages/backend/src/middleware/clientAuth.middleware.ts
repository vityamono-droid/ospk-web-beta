import { Response, RequestHandler } from 'express'

const clientAuthBase = async (container: any, res: Response) => {
  if (!container || (!container.client_name && !container.client_id)) {
    return
  }

  const { client_id, client_name } = container
  let client = await res.locals.prisma.client.findUnique({
    select: { id: true, name: true, secret: true, firstParty: true },
    where: {
      id: client_id,
      name: client_name,
      removedAt: null,
    },
  })

  if (!client || (!client.firstParty && !container.client_secret)) {
    return
  }

  if ((client_id && client_name) && (client_id != client.id || client_name != client.name)) {
    return
  }

  return {
    client_id: client.id,
    client_secret: client.secret ?? undefined,
  }
}

const withClientAuth = (hint: 'query' | 'body'): RequestHandler<any, any, any, any> => {
  let middleware: RequestHandler
  switch (hint) {
    case 'body': {
      middleware = async (req, res, next) => {
        const result = await clientAuthBase(req.body, res)
        if (!result) {
          next()
          return
        }

        req.body.client_id = result.client_id
        req.body.client_secret = result.client_secret
        next()
      }

      return middleware
    }
    case 'query': {
      middleware = async (req, res, next) => {
        const result = await clientAuthBase(req.query, res)
        if (!result) {
          next()
          return
        }

        req.query.client_id = result.client_id
        next()
      }

      return middleware
    }
    default: {
      throw new Error('Error generating client auth middleware: Invalid hint option')
    }
  }
}

export default withClientAuth
