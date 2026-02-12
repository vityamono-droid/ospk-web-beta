import Autocomplete from '@components/Autocomplete'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import useObjectState from '@hooks/useObjectState'

interface HelpModalProps {
  open?: boolean
  onClose?: Callback
}

const HelpModal = ({ open, onClose }: HelpModalProps) => {
  const categoryOptions = [
    {
      label: 'Работа с сайтом',
      value: 'WORK_PROCESS',
    },
    {
      label: 'Сообщить о неполадке',
      value: 'REPORT_BUG',
    },
  ]

  const [form, _, setFormProp] = useObjectState({
    category: '',
    content: '',
  })

  return (
    <Modal title={'Создание обращения'} open={open} onClose={onClose}>
      <Stack width={500} spacing={2}>
        <Autocomplete
          label='Тема обращения'
          options={categoryOptions}
          value={form.category}
          onChange={(value) => setFormProp({ category: value })}
        />
        <TextBox
          multiline
          rows={5}
          label={'Текст обращения'}
          value={form.content}
          onChange={(value) => setFormProp({ content: value })}
        />
        <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
          <Button onClick={onClose}>Отмена</Button>
          <Button color={'success'} variant={'outlined'} onClick={onClose}>
            Отправить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default HelpModal
