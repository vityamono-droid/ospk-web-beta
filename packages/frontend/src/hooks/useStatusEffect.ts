import { useEffect } from 'react'

import type { QueryStatus } from '@reduxjs/toolkit/query/react'

interface Dependency {
  isSuccess: boolean
  status: QueryStatus
}

const useStatusEffect = <TDep extends Dependency>(callback: Callback, dependencies: TDep[]) => {
  useEffect(
    () => {
      dependencies.map((item) => item.isSuccess).includes(true) && callback()
    },
    dependencies.map((item) => item.status),
  )
}

export default useStatusEffect
