import { useState } from 'react'

type InputType<TValue> = keyof TValue extends string ? (keyof TValue)[] : string[]

type ErrorObject<TValue = any> = { [key in keyof TValue]?: boolean }

type ReturnType<TValue = any> = [ErrorObject<TValue>, (value: TValue) => boolean]

const useAnalyzeRequired = <TValue = any>(required: InputType<TValue>): ReturnType<TValue> => {
  const [error, setError] = useState<ErrorObject<TValue>>({})

  return [
    error,
    (value: TValue) => {
      let currentError: ErrorObject<TValue> = {}

      for (const key in value) {
        if (!required.includes(key)) {
          continue
        }

        if (typeof value[key] === 'undefined' || value[key] == null || (typeof value[key] === 'string' && !value[key])) {
          currentError[key] = true
        }
      }

      setError(currentError)
      return !Object.values(currentError).find((item) => item === true)
    },
  ]
}

export default useAnalyzeRequired
