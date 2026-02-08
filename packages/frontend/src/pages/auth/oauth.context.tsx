import { createContext, useContext, type ReactNode } from 'react'

interface OAuthContextProps {
  client: string
}

const OAuthContext = createContext<OAuthContextProps>({
  client: 'empty'
})

interface OAuthProviderProps extends OAuthContextProps {
  children?: ReactNode
}

const OAuthProvider = ({ client, children }: OAuthProviderProps) => {
  localStorage.setItem('client', client)

  return (
    <OAuthContext value={{ client }}>
      {!!children && children}
    </OAuthContext>
  )
}

export const useOAuthContext = () => useContext(OAuthContext)

export default OAuthProvider
