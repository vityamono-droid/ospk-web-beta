import { RequestHandler } from 'express'

import path from 'path'
import fs from 'fs'

interface ParseFormOptions {
  dest?: string
  parse?: boolean
}

const withParseForm = ({ dest, parse = true }: ParseFormOptions): RequestHandler<any> => (req, _, next) => {
  if (!!parse && !!req.body && !!req.body.data) {
    try {
      req.body = JSON.parse(req.body.data)
    } catch {
      req.body = undefined
    }
  }

  const handleFileArray = (dest: string, array: Express.Multer.File[]) => {
    for (const file of array) {
      const filepath = path.join(process.cwd(), dest)
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true })
      }

      fs.copyFileSync(file.path, path.join(filepath, file.filename))
      fs.rmSync(file.path)

      file.path = `/${path.join(dest, file.filename).replaceAll('\\', '/')}`
    }
  }

  if (!!dest && !!req.file) {
    handleFileArray(dest, [req.file])
  }

  if (!!dest && !!req.files) {
    if (Array.isArray(req.files)) {
      handleFileArray(dest, req.files)
    } else {
      for (const key in req.files) {
        handleFileArray(dest, req.files[key])
      }
    }
  }

  next()
}

export default withParseForm
