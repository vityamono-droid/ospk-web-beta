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
    const filepath = path.join(process.cwd(), dest)
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true })
    }

    fs.copyFileSync(req.file.path, path.join(filepath, req.file.filename))
    fs.rmSync(req.file.path)

    req.file.path = `/${path.join(dest, req.file.filename).replaceAll('\\', '/')}`
  }

  next()
}

export default withParseForm
