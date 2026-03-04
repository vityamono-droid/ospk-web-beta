import Autocomplete from '@components/Autocomplete'
import Modal from '@components/Modal'
import SaveCancelButton from '@components/SaveCancelButton'
import Stack from '@mui/material/Stack'

import { useState } from 'react'
import { useUpdateOrderMutation } from '@api/admin/orders/orders.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { OrderStatus } from '@ospk/web-models/orders'

interface OrderModalProps {
  id: string
  status: OrderStatus
  open?: boolean
  onClose?: Callback
}

const OrderModal = ({ id, status, open, onClose }: OrderModalProps) => {
  const [value, setValue] = useState(status)

  const [updateOrder, updateResponse] = useUpdateOrderMutation()

  useStatusEffect(() => !!onClose && onClose(), [updateResponse])

  return (
    <Modal title={'Изменить статус заказа'} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={400}>
        <Autocomplete
          label={'Новый статус'}
          options={[
            {
              label: 'Отменен',
              value: 'REJECTED',
            },
            {
              label: 'Ожидает',
              value: 'PENDING',
            },
            {
              label: 'Готов к выдаче',
              value: 'READY',
            },
            {
              label: 'Выполнен',
              value: 'FULFILLED',
            },
          ]}
          value={value}
          onChange={(value) => setValue(value as any)}
        />
        <SaveCancelButton onCancel={onClose} onSave={() => updateOrder({ id, data: { status: value } })} />
      </Stack>
    </Modal>
  )
}

export default OrderModal
