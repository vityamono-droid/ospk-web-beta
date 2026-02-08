import { useGetAccountQuery } from '@api/common/accounts.api'
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface AppContextProps {
  account?: any
}

const AppContext = createContext<AppContextProps>({})

interface AppProviderProps {
  children?: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  // const [account, setAccount] = useState()

  // const getResponse = useGetAccountQuery(
  //   {},
  //   {
  //     skip: account,
  //   },
  // )

  // useEffect(() => {
  //   if (!getResponse.isSuccess) {
  //     return
  //   }

  //   setAccount(getResponse.data)
  // }, [getResponse.status])

  return <AppContext value={{  }}>{!!children && children}</AppContext>
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
