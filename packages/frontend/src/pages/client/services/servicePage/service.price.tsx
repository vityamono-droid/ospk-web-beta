import { LineChart } from '@mui/x-charts/LineChart'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useState } from 'react'

import type { PriceHistoryData } from '@ospk/web-models/services'

type ServicePriceMode = 'ALL_TIME' | 'ONE_YEAR' | 'MONTH'

const ServicePrice = ({ data }: { data: PriceHistoryData[] }) => {
  const [items, setItems] = useState(data)
  const [mode, setMode] = useState<ServicePriceMode>('ALL_TIME')

  const dateFormatter = (value: string) => {
    switch (mode) {
      case 'ALL_TIME': {
        return new Date(value).toLocaleDateString()
      }
      case 'ONE_YEAR': {
        return ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][new Date(value).getMonth()]
      }
      case 'MONTH': {
        return [new Date(value).getMonth() + 1, new Date(value).getDate()]
          .map((item) => `${item}`.padStart(2, '0'))
          .join('/')
      }
    }
  }

  const handleModeChange = (newMode: ServicePriceMode) => {
    if (newMode === mode) {
      return
    }

    setMode(newMode)

    const current = new Date()
    switch (newMode) {
      case 'ALL_TIME': {
        setItems(data)
        break
      }
      case 'ONE_YEAR': {
        setItems(data.filter((item) => new Date(item.createdAt).getTime() >= current.setDate(current.getDate() - 365)))
        break
      }
      case 'MONTH': {
        setItems(data.filter((item) => new Date(item.createdAt).getTime() >= current.setDate(current.getDate() - 31)))
        break
      }
    }
  }

  return (
    <Paper variant={'outlined'}>
      <Stack p={2} spacing={2}>
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={1} alignItems={'baseline'}>
            <Typography variant={'h6'} fontWeight={'bold'}>
              История цен
            </Typography>
            {items.length > 0 && (
              <Typography color={'gray'} variant={'body2'}>
                от {items.reduce((min, obj) => (obj.price < min.price ? obj : min)).price} до{' '}
                {items.reduce((max, obj) => (obj.price > max.price ? obj : max)).price}
              </Typography>
            )}
          </Stack>
          <ButtonGroup size={'small'}>
            {['ALL_TIME', 'ONE_YEAR', 'MONTH'].map((item) => (
              <Button
                variant={item === mode ? 'contained' : 'outlined'}
                sx={{ textTransform: 'none' }}
                onClick={() => handleModeChange(item as ServicePriceMode)}>
                {item === 'ALL_TIME' ? 'Все время' : item === 'ONE_YEAR' ? 'Год' : 'Месяц'}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>
        <LineChart
          localeText={{ noData: 'Нет данных' }}
          height={250}
          series={[
            {
              data: items.map((item) => item.price),
              label: 'История цены',
            },
            {
              data: items.map((item) => item.vat),
              label: 'История НДС',
            },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: items.map((item) => item.createdAt),
              valueFormatter: dateFormatter,
            },
          ]}
          yAxis={[
            {
              label: 'Цена (руб.)',
              disableTicks: true,
              position: 'none',
            },
          ]}
        />
      </Stack>
    </Paper>
  )
}

export default ServicePrice
