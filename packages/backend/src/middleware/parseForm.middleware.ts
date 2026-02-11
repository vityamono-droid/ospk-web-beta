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

  if (!!dest && !!req.file) {
    if (dest.startsWith('/')) {
      dest = dest.slice(1)
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest)
    }

    const newName = path.join(dest, req.file.filename)
    fs.copyFileSync(req.file.path, newName)
    fs.rmSync(req.file.path)

    req.file.path = `/${newName.replaceAll('\\', '/')}`
  }

  next()
}

export default withParseForm
