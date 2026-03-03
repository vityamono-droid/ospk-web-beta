import Autocomplete from '@components/Autocomplete'
import Modal from '@components/Modal'
import SaveCancelButton from '@components/SaveCancelButton'
import Stack from '@mui/material/Stack'

interface OrderModalProps {
  id: string
  open?: boolean
  onClose?: Callback
}

const OrderModal = ({ id, open, onClose }: OrderModalProps) => {
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
          value={'PENDING'}
        />
        <SaveCancelButton onCancel={onClose} onSave={onClose} />
      </Stack>
    </Modal>
  )
}

export default OrderModal
