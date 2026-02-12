import type { QueryStatus } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'

interface Dependency {
  isSuccess: boolean
  status: QueryStatus
}

const useStatusEffect = (callback: Callback, dependencies: Dependency[]) => {
  useEffect(
    () => {
      if (!dependencies.map((item) => item.isSuccess).includes(true)) {
        return
      }

      callback()
    },
    dependencies.map((item) => item.status),
  )
}

export default useStatusEffect
