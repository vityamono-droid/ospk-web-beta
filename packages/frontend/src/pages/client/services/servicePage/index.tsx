import { useGetServiceQuery } from '@api/client/services.api'
import ArticleLikeContent from '@components/ArticleLikeContent'
import useStatusEffect from '@hooks/useStatusEffect'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import type { ServiceNavDetails } from '@ospk/web-models/services'
import { useState } from 'react'
import { useParams } from 'react-router'
import { LineChart } from '@mui/x-charts/LineChart'
import PageHeader from '@components/PageHeader'
import Typography from '@mui/material/Typography'

const ServicePage = () => {
  const { id } = useParams()

  const [service, setService] = useState<ServiceNavDetails>()
  const getResponse = useGetServiceQuery(id!, {
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setService(getResponse.data), [getResponse])

  return (
    <>
      {service && (
        <Paper>
          <Stack p={2} spacing={2}>
            <PageHeader title={'Назад'} />
            <ArticleLikeContent item={{ ...service, content: service.content! }} />
            <Paper elevation={5}>
              <Stack p={2} spacing={2}>
                <Typography variant={'h5'} fontWeight={'bold'}>Прозрачность цен</Typography>
                <LineChart
                  height={300}
                  series={[
                    {
                      data: service.priceHistory.map((item) => item.price),
                      label: 'История цены',
                    },
                    {
                      data: service.priceHistory.map((item) => item.vat),
                      label: 'История НДС',
                    },
                  ]}
                  xAxis={[
                    {
                      scaleType: 'point',
                      data: service.priceHistory.map((item) => item.createdAt),
                      valueFormatter: (value) => value,
                    },
                  ]}
                  yAxis={[
                    {
                      label: 'Цена (руб.)',
                    },
                  ]}
                />
              </Stack>
            </Paper>
          </Stack>
        </Paper>
      )}
    </>
  )
}

export default ServicePage
