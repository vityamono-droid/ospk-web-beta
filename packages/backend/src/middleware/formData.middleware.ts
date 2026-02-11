import { RequestHandler } from 'express'
import multer, { diskStorage, Field } from 'multer'
import crypto from 'crypto'

const multerInstance = multer({
  storage: diskStorage({
    destination: 'static/unknown',
    filename: (_req, _file, cb) => {
      try {
        const uuid = crypto.randomBytes(8)
        cb(null, `${uuid.toString('hex')}_${Date.now()}`)
      } catch (err) {
        cb(null, crypto.randomUUID())
      }
    },
  }),
})

type SingleParams = {
  type: 'SINGLE'
  fieldName: string
}

type ArrayParams = {
  type: 'ARRAY'
  fieldName: string
  maxCount?: number
}

type FieldsParams = {
  type: 'FIELDS'
  fields: readonly Field[]
}

type RestParams = {
  type: 'ANY' | 'NONE'
}

type MulterOptions = (SingleParams | ArrayParams | FieldsParams | RestParams) & {
  copyTo?: string
}

const withFormData = (options: MulterOptions): RequestHandler<any> => {
  let middleware: RequestHandler<any>
  switch (options.type) {
    case 'SINGLE': {
      middleware = multerInstance.single(options.fieldName)
      break
    }
    case 'ARRAY': {
      middleware = multerInstance.array(options.fieldName, options.maxCount)
      break
    }
    case 'FIELDS': {
      middleware = multerInstance.fields(options.fields)
      break
    }
    case 'ANY': {
      middleware = multerInstance.any()
      break
    }
    case 'NONE': {
      middleware = multerInstance.none()
      break
    }
  }

  return middleware
}

export default withFormData
