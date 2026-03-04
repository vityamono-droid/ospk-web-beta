import Chip from '@mui/material/Chip'
import DataGrid from '@components/DataGrid'
import OrderModal from './order.modal'
import Stack from '@mui/material/Stack'
import RefreshButton from '@components/RefreshButton'

import { useState } from 'react'
import { useListOrdersQuery } from '@api/admin/orders/orders.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { OrderDetails, OrderStatus } from '@ospk/web-models/orders'

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

const OrderListPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string>()
  const [orders, setOrders] = useState<OrderDetails[]>([])

  const listResponse = useListOrdersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  )

  useStatusEffect(() => setOrders(listResponse.data ?? []), [listResponse])

  const handleModalOpen = (id: string) => {
    if (
      orders.find((item) => item.id == id)?.status === 'REJECTED' ||
      orders.find((item) => item.id == id)?.status === 'FULFILLED'
    ) {
      return
    }

    setSelected(id)
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelected(undefined)
  }

  return (
    <>
      <Stack direction={'row'}>
        <RefreshButton onClick={() => {}} />
      </Stack>
      <DataGrid
        head={[
          {
            label: 'Услуга',
            value: 'label',
          },
          {
            label: 'Отдел',
            value: 'department',
          },
          {
            label: 'Статус',
            value: 'status',
          },
          {
            label: 'Кол-во',
            value: 'amount',
          },
          {
            label: 'Сумма',
            value: 'price',
          },
          {
            label: 'Дата заказа',
            value: 'createdAt',
          },
        ]}
        body={orders.map((item) => ({
          ...item,
          status: <Chip size={'small'} variant={'outlined'} label={statusToText(item.status)} />,
          price: `${item.price} ₽`,
          createdAt: <Chip size={'small'} variant={'outlined'} label={new Date(item.createdAt).toLocaleDateString()} />,
        }))}
        onRowClick={handleModalOpen}
      />
      {openModal && (
        <OrderModal
          id={selected!}
          status={orders.find((item) => item.id == selected)?.status ?? 'PENDING'}
          open={openModal}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}

export default OrderListPage
