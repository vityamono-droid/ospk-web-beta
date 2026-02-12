import { useGetCatalogQuery } from '@api/client/services.api'
import { useClientContext } from '@apps/client.context'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ServiceCatalogNavDetails } from '@ospk/web-models/services'
import { useEffect, useState } from 'react'
import ServiceSidebar from './services.sidebar'
import ServiceTable from './services.table'

const ServiceListPage = () => {
  const {
    services: { catalogs, selected, onChange },
  } = useClientContext()

  useEffect(() => {
    if (!selected && catalogs.length) {
      onChange(catalogs[0]?.id)
    }
  }, [catalogs])

  const [hash, setHash] = useState<string | null>(null)
  const [catalog, setCatalog] = useState<ServiceCatalogNavDetails>({} as any)

  const getResponse = useGetCatalogQuery(selected!, {
    skip: !selected,
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    const url = new URL(location.href)
    if (!url.hash || !!hash) {
      return
    }

    setHash(url.hash.substring(1))
    history.replaceState(null, '', location.href.replace(url.hash, ''))
  }, [])

  useEffect(() => {
    if (!hash) {
      return
    }

    const element = document.getElementById(hash)
    !!element && element.scrollIntoView({ behavior: 'smooth' })
  }, [catalogs])

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setCatalog(getResponse.data)
  }, [getResponse.status])

  return (
    <Stack>
      {!!catalog && (
        <Stack direction={'row'} spacing={2}>
          <Stack width={'100%'}>
            <Paper>
              <Stack p={2} spacing={4}>
                <Stack direction={'row'} spacing={1}>
                  {catalog.banner && (
                    <Stack minWidth={150} borderRadius={1.5} overflow={'hidden'}>
                      <img width={150} height={100} src={catalog.banner} />
                    </Stack>
                  )}
                  <Stack spacing={1} justifyContent={'flex-end'}>
                    <Typography variant={'h4'}>{catalog.label}</Typography>
                    {catalog.description && <Typography>{catalog.description}</Typography>}
                  </Stack>
                </Stack>
                {catalog.categories?.map((item) => (
                  <ServiceTable data={item} />
                ))}
              </Stack>
            </Paper>
          </Stack>
          <Stack width={'40%'}>
            <ServiceSidebar />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

export default ServiceListPage
