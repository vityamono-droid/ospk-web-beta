import { useListCatalogsQuery } from '@api/client/services.api'
import type { ServiceCatalogNav } from '@ospk/web-models/services'
import { createContext, useContext, useEffect, useState, type JSX } from 'react'

interface ServiceConfig {
  catalogs: ServiceCatalogNav[]
  selected?: string
  onChange: ValueCallback<string>
}

interface ClientContextProps {
  services: ServiceConfig
}

const ClientContext = createContext<ClientContextProps>({
  services: {
    catalogs: [],
    onChange: () => {},
  },
})

const ClientProvider = ({ children }: { children: JSX.Element }) => {
  const [serviceCatalogs, setServiceCatalogs] = useState<ServiceCatalogNav[]>([])
  const [selectedServiceCatalog, setSelectedCatalog] = useState<string>()

  const listServiceCatalogsResponse = useListCatalogsQuery({})

  useEffect(() => {
    if (!listServiceCatalogsResponse.isSuccess) {
      return
    }

    setServiceCatalogs(listServiceCatalogsResponse.data)
  }, [listServiceCatalogsResponse.status])

  const state = {
    services: {
      catalogs: serviceCatalogs,
      selected: selectedServiceCatalog,
      onChange: (value) => setSelectedCatalog(value),
    },
  } satisfies ClientContextProps

  return <ClientContext value={state}>{children}</ClientContext>
}

export const useClientContext = () => useContext(ClientContext)

export default ClientProvider
