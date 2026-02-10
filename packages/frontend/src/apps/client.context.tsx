import { useListCatalogsQuery as useListArticleCatalogsQuery } from '@api/client/articles.api'
import { useListCatalogsQuery as useListServiceCatalogsQuery } from '@api/client/services.api'
import type { CatalogItem } from '@ospk/web-models/articles'
import type { ServiceCatalogNav } from '@ospk/web-models/services'
import { createContext, useContext, useEffect, useState, type JSX } from 'react'

interface ServiceConfig {
  catalogs: ServiceCatalogNav[]
  selected?: string
  onChange: ValueCallback<string | undefined>
}

interface ArticleConfig {
  catalogs: CatalogItem[]
  selected?: string
  onChange: ValueCallback<string | undefined>
}

interface ClientContextProps {
  services: ServiceConfig
  articles: ArticleConfig
}

const ClientContext = createContext<ClientContextProps>({
  services: {
    catalogs: [],
    onChange: () => {},
  },
  articles: {
    catalogs: [],
    onChange: () => {},
  },
})

const ClientProvider = ({ children }: { children: JSX.Element }) => {
  const [serviceCatalogs, setServiceCatalogs] = useState<ServiceCatalogNav[]>([])
  const [articleCatalogs, setArticleCatalogs] = useState<CatalogItem[]>([])
  const [selectedServiceCatalog, setSelectedServiceCatalog] = useState<string>()
  const [selectedArticleCatalog, setSelectedArticleCatalog] = useState<string>()

  const listServiceCatalogsResponse = useListServiceCatalogsQuery({})
  const listArticleCatalogsResponse = useListArticleCatalogsQuery({})

  useEffect(() => {
    if (!listServiceCatalogsResponse.isSuccess) {
      return
    }

    setServiceCatalogs(listServiceCatalogsResponse.data)
  }, [listServiceCatalogsResponse.status])

  useEffect(() => {
    if (!listArticleCatalogsResponse.isSuccess) {
      return
    }

    setArticleCatalogs(listArticleCatalogsResponse.data)
  }, [listArticleCatalogsResponse.status])

  const state = {
    services: {
      catalogs: serviceCatalogs,
      selected: selectedServiceCatalog,
      onChange: (value) => setSelectedServiceCatalog(value),
    },
    articles: {
      catalogs: articleCatalogs,
      selected: selectedArticleCatalog,
      onChange: (value) => setSelectedArticleCatalog(value),
    },
  } satisfies ClientContextProps

  return <ClientContext value={state}>{children}</ClientContext>
}

export const useClientContext = () => useContext(ClientContext)

export default ClientProvider
