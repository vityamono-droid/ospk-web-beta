import { useListCatalogsQuery as useListArticleCatalogsQuery } from '@api/client/articles.api'
import { useListCarouselsQuery } from '@api/client/carousels.api'
import { useListCatalogsQuery as useListServiceCatalogsQuery } from '@api/client/services.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { CatalogItem } from '@ospk/web-models/articles'
import type { CarouselData } from '@ospk/web-models/carousels'
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

interface CarouselConfig {
  HOME: CarouselData[]
  SERVICES: CarouselData[]
  NEWS: CarouselData[]
  PROFILE: CarouselData[]
}

interface ClientContextProps {
  services: ServiceConfig
  articles: ArticleConfig
  carousels: CarouselConfig
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
  carousels: {
    HOME: [],
    SERVICES: [],
    NEWS: [],
    PROFILE: [],
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

const useCarouselConfig = (): CarouselConfig => {
  const [carousels, setCarousels] = useState<CarouselData[]>([])

  const listResponse = useListCarouselsQuery({})

  useStatusEffect(() => {
    if (!listResponse.data) {
      setCarousels([])
      return
    }

    setCarousels(listResponse.data)
  }, [listResponse])

  return {
    HOME: carousels.filter((item) => item.placement == 'HOME'),
    SERVICES: carousels.filter((item) => item.placement == 'SERVICES'),
    NEWS: carousels.filter((item) => item.placement == 'NEWS'),
    PROFILE: carousels.filter((item) => item.placement == 'PROFILE'),
  }
}

const ClientProvider = ({ children }: { children: JSX.Element }) => {
  const services = useServiceConfig()
  const articles = useArticleConfig()
  const carousels = useCarouselConfig()

  useEffect(() => {
    document.title = 'ГБУЗ - "ЧОСПК"'
  }, [])

  return <ClientContext value={{ services, articles, carousels }}>{children}</ClientContext>
}

export const useClientContext = () => useContext(ClientContext)

export default ClientProvider
