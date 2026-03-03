import Modal from '@components/Modal'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import NoImageIcon from '@mui/icons-material/HideImage'

import { useNavigate } from 'react-router'

import type { OrderStatus } from '@ospk/web-models/orders'

interface OrdersModalProps {
  open?: boolean
  onClose?: Callback
}

const statusToText = (status: OrderStatus) => {
  switch (status) {
    case 'REJECTED': {
      return 'Отменен'
    }
    case 'PENDING': {
      return 'Ожидает'
    }
    case 'READY': {
      return 'Готов к выдаче'
    }
    case 'FULFILLED': {
      return 'Выполнен'
    }
  }
}

const OrdersModal = ({ open, onClose }: OrdersModalProps) => {
  const navigate = useNavigate()

  const orders = [
    {
      id: crypto.randomUUID(),
      label: 'Альбумин, 5%, 20 мл',
      banner: '/static/services/banners/a89e2638880ae098_1770893163160',
      department: 'г. Челябинск',
      amount: 2,
      price: 2174 * 2,
      status: 'PENDING',
      serviceId: '69345247-4a73-4ec0-8f9c-72d7ba99363f',
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: crypto.randomUUID(),
      label: 'Стандартные изогемагглютинирующие сыворотки',
      banner: '',
      department: 'г. Сатка',
      amount: 1,
      price: 36,
      status: 'FULFILLED',
      serviceId: 'ac846b96-d2ec-4a38-9d03-439e693dcee6',
      createdAt: new Date(new Date().setMonth(0)).toLocaleDateString(),
    }
  ]

  const handleItemClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`)
    !!onClose && onClose()
  }

  return (
    <Modal title={'История заказов'} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={550} minHeight={600} justifyContent={'space-between'}>
        <Stack>
          {orders.map((item) => (
            <MenuItem key={item.id} divider onClick={() => handleItemClick(item.serviceId)}>
              <Stack width={'100%'} direction={'row'} spacing={1}>
                <Stack>
                  {item.banner ? (
                    <img width={72} src={item.banner ?? ''} />
                  ) : (
                    <Stack
                      height={72}
                      width={72}
                      alignItems={'center'}
                      justifyContent={'center'}
                      border={'2px dotted gray'}
                      borderRadius={2}>
                      <NoImageIcon sx={{ color: 'gray' }} />
                    </Stack>
                  )}
                </Stack>
                <Stack width={'100%'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>{item.label}</Typography>
                    <Typography>{item.price} ₽</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={1} alignItems={'baseline'}>
                      <Typography color={'gray'} variant={'body2'}>
                        Статус:
                      </Typography>
                      <Typography>{statusToText(item.status as OrderStatus)}</Typography>
                    </Stack>
                    <Typography>{item.amount} ед.</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} spacing={1} alignItems={'baseline'}>
                      <Typography color={'gray'} variant={'body2'}>
                        Отдел:
                      </Typography>
                      <Typography>{item.department}</Typography>
                    </Stack>
                    <Typography>{item.createdAt}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button onClick={onClose}>Закрыть</Button>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default OrdersModal
