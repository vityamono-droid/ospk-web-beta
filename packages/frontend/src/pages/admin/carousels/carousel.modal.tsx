import Modal from '@components/Modal'
import TextBox from '@components/TextBox'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Switch from '@components/Switch'
import { useState } from 'react'

const AddCarousel = ({ carousel, open, onClose }: { carousel?: any, open: boolean, onClose: () => void }) => {
  const headerTitle = carousel ? 'Изменить карусель' : 'Добавить карусель'
  const [data, setData] = useState(
    carousel ?? {
      label: '',
      banner: '',
      disabled: false,
    },
  )

  return (
    <Modal title={headerTitle} open={open} onClose={onClose}>
      <TextBox size={'small'} label={'Заголовок'} maxLength={128} value={data.label} />
      <TextBox type={'url'} size={'small'} label={'Ссылка'} maxLength={512} value={data.link} />
      <TextBox size={'small'} label={'Описание'} rows={3} multiline maxLength={256} value={data.description} />
      <Box sx={{ gap: 2, display: 'flex' }}>
        <TextBox type={'date'} size={'small'} label={'Начало'} value={data.durationFrom} />
        <TextBox type={'date'} size={'small'} label={'Конец'} value={data.durationTo} />
      </Box>
      <Switch label={'Активен'} checked={data.disabled} />
      <TextBox type={'file'} value={data.banner} />
      <Box sx={{ gap: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant={'contained'}>Сохранить</Button>
      </Box>
    </Modal>
  )
}

export default AddCarousel
