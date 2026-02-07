import type { webcrypto } from 'node:crypto'

let crypto: webcrypto.Crypto | Promise<webcrypto.Crypto>

crypto = globalThis.crypto as webcrypto.Crypto
crypto = (globalThis.crypto as any)?.webcrypto ?? globalThis.crypto ?? import('node:crypto').then((m) => m.webcrypto)

const getRandomValues = async (size: number) => {
  return (await crypto).getRandomValues(new Uint8Array(size))
}

const random = async (size: number) => {
  const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'
  const evenDistCutoff = Math.pow(2, 8) - (Math.pow(2, 8) % mask.length)

  let result = ''
  while (result.length < size) {
    const randomBytes = await getRandomValues(size - result.length)

    for (const randomByte of randomBytes) {
      if (randomByte < evenDistCutoff) {
        result += mask[randomByte % mask.length]
      }
    }
  }

  return result
}

const generateChallenge = async (code_verifier: string) => {
  const buffer = await (await crypto).subtle.digest('SHA-256', new TextEncoder().encode(code_verifier))
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
    .replace(/=/g, '')
}

export const generatePKCE = async () => {
  const state = await random(18)
  const verifier = await random(128)
  const challenge = await generateChallenge(verifier)

  return {
    state: state,
    code_verifier: verifier,
    code_challenge: challenge,
  }
}
