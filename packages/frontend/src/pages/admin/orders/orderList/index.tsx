import DataGrid from '@components/DataGrid'
import { useState } from 'react'
import OrderModal from './order.modal'
import Chip from '@mui/material/Chip'

import type { OrderStatus } from '@ospk/web-models/orders'

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

  const handleModalOpen = (id: string) => {
    setSelected(id)
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelected(undefined)
  }

  return (
    <>
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
        body={[
          {
            id: crypto.randomUUID(),
            label: 'Альбумин, 5%, 20 мл',
            department: 'г. Челябинск',
            amount: '2',
            status: <Chip size={'small'} variant={'outlined'} label={statusToText('PENDING')} />,
            price: '4348 ₽',
            createdAt: <Chip size={'small'} variant={'outlined'} label={new Date().toLocaleDateString()} />,
          },
          {
            id: crypto.randomUUID(),
            label: 'Стандартные эритроциты AB0',
            department: 'г. Магнитогорск',
            amount: '1',
            status: <Chip size={'small'} variant={'outlined'} label={statusToText('PENDING')} />,
            price: '45 ₽',
            createdAt: <Chip size={'small'} variant={'outlined'} label={new Date().toLocaleDateString()} />,
          },
          {
            id: crypto.randomUUID(),
            label: 'Стандартные изогемагглютинирующие сыворотки',
            department: 'г. Златоуст,',
            amount: '1',
            status: <Chip size={'small'} variant={'outlined'} label={statusToText('PENDING')} />,
            price: '36 ₽',
            createdAt: <Chip size={'small'} variant={'outlined'} label={new Date().toLocaleDateString()} />,
          },
          {
            id: crypto.randomUUID(),
            label: 'Стандартные изогемагглютинирующие сыворотки',
            department: 'г. Сатка',
            amount: '1',
            status: <Chip size={'small'} variant={'outlined'} label={statusToText('PENDING')} />,
            price: '36 ₽',
            createdAt: <Chip size={'small'} variant={'outlined'} label={new Date().toLocaleDateString()} />,
          },
        ]}
        onRowClick={handleModalOpen}
      />
      {openModal && <OrderModal id={selected!} open={openModal} onClose={handleModalClose} />}
    </>
  )
}

export default OrderListPage
