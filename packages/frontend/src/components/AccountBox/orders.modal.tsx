import Modal from '@components/Modal'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import NoImageIcon from '@mui/icons-material/HideImage'
import CancelIcon from '@mui/icons-material/Close'
import EmptyBanner from '@assets/empty.svg?react'

import { useNavigate } from 'react-router'

import { useListOrdersQuery, useUpdateOrdersMutation } from '@api/client/orders.api'
import useStatusEffect from '@hooks/useStatusEffect'
import { useState } from 'react'

import { enqueueSnackbar } from 'notistack'

import type { OrderData, OrderStatus } from '@ospk/web-models/orders'

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

  const [orders, setOrders] = useState<OrderData[]>([])
  const [updateOrder, updateResponse] = useUpdateOrdersMutation()

  const listResponse = useListOrdersQuery({})

  useStatusEffect(() => setOrders(listResponse.data ?? []), [listResponse])
  useStatusEffect(() => {
    enqueueSnackbar({
      variant: 'success',
      message: 'Заказа отменен успешно',
      autoHideDuration: 2000,
    })
  }, [updateResponse])

  const handleItemClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`)
    !!onClose && onClose()
  }

  return (
    <Modal title={'История заказов'} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={550} minHeight={600} justifyContent={'space-between'}>
        {orders.length > 0 ? (
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
                      <Typography>{new Date(item.createdAt).toLocaleDateString()}</Typography>
                    </Stack>
                  </Stack>
                  {(item.status === 'PENDING' || item.status === 'READY') && (
                    <Tooltip title={'Отменить заказ'}>
                      <Button variant={'outlined'} onClick={() => updateOrder(item.id)}>
                        <CancelIcon />
                      </Button>
                    </Tooltip>
                  )}
                </Stack>
              </MenuItem>
            ))}
          </Stack>
        ) : (
          <EmptyBanner />
        )}
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button onClick={onClose}>Закрыть</Button>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default OrdersModal
