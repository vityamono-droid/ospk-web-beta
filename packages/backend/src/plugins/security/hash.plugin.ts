import { RequestHandler } from 'express'
import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto'

const signature = 'v7pk'
const saltLength = 32
const hashLength = 254
const iterations = 100000

const buffLength = hashLength - saltLength - signature.length

const hasher = {
  generate(value: string) {
    const salt = randomBytes(saltLength / 2)
    const hash = pbkdf2Sync(Buffer.from(value), salt, iterations, buffLength / 2, 'sha512')

    return `${signature}${Buffer.concat([hash, salt]).toString('hex')}`
  },
  validate(value: string, hash: string) {
    if (value.length == 0 || hash.length != hashLength) return false
    if (signature != hash.substring(0, signature.length)) return false

    const hashStr = hash.substring(signature.length, hashLength - saltLength)
    const saltStr = hash.substring(signature.length + buffLength)

    const saltBuff = Buffer.from(saltStr, 'hex')
    const hashBuff = Buffer.from(hashStr, 'hex')
    const testBuff = pbkdf2Sync(Buffer.from(value), saltBuff, iterations, buffLength / 2, 'sha512')

    return timingSafeEqual(hashBuff, testBuff)
  },
}

export const getHasher = () => hasher

const useHash: RequestHandler = (_req, res, next) => {
  res.locals.hasher = hasher

  next()
}

export type Hasher = typeof hasher
export default useHash
