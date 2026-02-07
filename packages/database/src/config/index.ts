import path from 'path'
import fs from 'fs'

const mode = process.env.MODE ?? 'DEV'
const file = path.join(__dirname, '..', '..', 'config', `config.${mode.trim()}.json`)
const config = JSON.parse(fs.readFileSync(file, 'utf-8'))

export default config as {
  host: string
  port: number
  catalog: string
  username: string
  password: string
}
