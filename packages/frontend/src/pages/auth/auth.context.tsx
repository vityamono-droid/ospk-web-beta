import { useGetAccountQuery } from '@api/common/accounts.api'
import { useAuthorizeMutation } from '@api/common/auth/auth.api'
import type { AccountData } from '@ospk/web-models/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface AppContextProps {
  account?: AccountData
}

const AppContext = createContext<AppContextProps>({})

interface AppProviderProps {
  on401: 'follow' | 'none'
  children?: ReactNode
}

const AuthProvider = ({ on401, children }: AppProviderProps) => {
  const [account, setAccount] = useState<AccountData>()

  const [authorize] = useAuthorizeMutation()

  const getResponse = useGetAccountQuery({}, {
    skip: !!account,
    pollingInterval: 30000,
  })

  useEffect(() => {
    if (!getResponse.isSuccess) {
      if (getResponse.error && 'status' in getResponse.error && getResponse.error.status === 401) {
        on401 === 'follow' && authorize({})
      }

      return
    }

    setAccount(getResponse.data)
  }, [getResponse.status])

  return <AppContext value={{ account }}>{!!children && children}</AppContext>
}

export const useAuthContext = () => useContext(AppContext)

export default AuthProvider
