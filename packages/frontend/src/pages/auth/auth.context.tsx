import { useGetAccountQuery } from '@api/common/auth/accounts.api'
import { useAuthorizeMutation } from '@api/common/auth/auth.api'

import { createContext, useContext, useEffect, useState } from 'react'

import type { ReactNode } from 'react'
import type { AccountData } from '@ospk/web-models/auth'

interface AppContextProps {
  account?: AccountData
}

const AuthContext = createContext<AppContextProps>({})

interface AppProviderProps {
  on401: 'follow' | 'none'
  children?: ReactNode
}

const AuthProvider = ({ on401, children }: AppProviderProps) => {
  const [account, setAccount] = useState<AccountData>()

  const [authorize] = useAuthorizeMutation()

  const getResponse = useGetAccountQuery(
    {},
    {
      skip: !!account,
    },
  )

  useEffect(() => {
    if (!getResponse.isSuccess) {
      if (getResponse.error && 'status' in getResponse.error && getResponse.error.status === 401) {
        on401 === 'follow' && authorize({})
      }

      return
    }

    setAccount(getResponse.data)
  }, [getResponse.status])

  return <AuthContext value={{ account }}>{!!children && children}</AuthContext>
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
