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

const useServiceConfig = (): ServiceConfig => {
  const [catalogs, setCatalogs] = useState<ServiceCatalogNav[]>([])
  const [selected, setSelected] = useState<string>()

  const listResponse = useListServiceCatalogsQuery({})

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setCatalogs(listResponse.data)
  }, [listResponse.status])

  return { catalogs, selected, onChange: (value) => setSelected(value) }
}

const useArticleConfig = (): ServiceConfig => {
  const [catalogs, setCatalogs] = useState<CatalogItem[]>([])
  const [selected, setSelected] = useState<string>()

  const listResponse = useListArticleCatalogsQuery({})

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setCatalogs(listResponse.data)
  }, [listResponse.status])

  return { catalogs, selected, onChange: (value) => setSelected(value) }
}

const ClientProvider = ({ children }: { children: JSX.Element }) => {
  const services = useServiceConfig()
  const articles = useArticleConfig()

  useEffect(() => {
    document.title = 'ГБУЗ - "ЧОСПК"'
  }, [])

  return <ClientContext value={{ services, articles }}>{children}</ClientContext>
}

export const useClientContext = () => useContext(ClientContext)

export default ClientProvider
