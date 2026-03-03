import Autocomplete from '@components/Autocomplete'
import MNumberBox from '@components/MNumberBox'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import SaveCancelButton from '@components/SaveCancelButton'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ServiceDataDetails } from '@ospk/web-models/services'
import type { UpsertOrderData } from '@ospk/web-models/orders'

interface OrderModalProps {
  service: ServiceDataDetails
  serviceId: string
  open?: boolean
  onClose?: Callback
}

const OrderModal = ({ service, serviceId, open, onClose }: OrderModalProps) => {
  const [error, analyze] = useAnalyzeRequired<UpsertOrderData>(
    service.amountType === 'INFINITE' ? ['departmentId'] : ['departmentId', 'amount'],
  )
  const [order, _, setOrderProp] = useObjectState<UpsertOrderData>({
    serviceId: serviceId,
    departmentId: '',
    amount: null,
  })

  const handleAmountChange = (value: string) => {
    if (!value || !+value) {
      setOrderProp({ amount: null })
      return
    }

    if (!!order.departmentId) {
      const max = service.departments.find((item) => item.id == order.departmentId)?.available ?? 10

      if (+value > max) {
        setOrderProp({ amount: `${max}` })
        return
      }
    }

    setOrderProp({ amount: value })
  }

  const handleSave = () => {
    const data = {
      ...order,
      amount: !!order.amount ? +order.amount : null,
    }

    if (!analyze(data)) {
      return
    }

    // update
  }

  return (
    <Modal title={'Создание заказа'} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={400}>
        <Autocomplete
          label={'Отдел *'}
          error={error.departmentId}
          options={service.departments.map((item) => ({ label: item.address, value: item.id }))}
          value={order.departmentId ?? ''}
          onChange={(value) => setOrderProp({ departmentId: value || null })}
        />
        <TextBox
          label={'Кол-во'}
          error={error.amount}
          disabled={service.amountType === 'INFINITE' || !order.departmentId}
          value={order.amount}
          slotProps={{
            input: {
              inputComponent: MNumberBox,
            },
          }}
          onChange={handleAmountChange}
        />
        <Stack direction={'row'} spacing={2} alignItems={'baseline'} justifyContent={'space-between'}>
          <Typography variant={'h6'} fontWeight={'bold'}>
            Итог:
          </Typography>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {service.amountType === 'FINITE' ? service.price * (order.amount ?? 1) : service.price} ₽
          </Typography>
        </Stack>
        <SaveCancelButton onCancel={onClose} onSave={handleSave} />
      </Stack>
    </Modal>
  )
}

export default OrderModal
