import { useListRegionsQuery } from '@api/client/gosuslugi.api'
import Autocomplete from '@components/Autocomplete'
import FileUpload from '@components/FileUpload'
import Modal from '@components/Modal'
import Checkbox from '@components/new/Checkbox'
import TextBox from '@components/new/TextBox'
import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ExpandIcon from '@mui/icons-material/ExpandMore'
import EsiaIcon from '@assets/esia.svg?react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { useAuthContext } from '@pages/auth/auth.context'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router'
import { useAuthorizeMutation } from '@api/common/auth/auth.api'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'

interface GosuslugiModalProps {
  open?: boolean
  onClose?: Callback
}

const GosuslugiModal = ({ open, onClose }: GosuslugiModalProps) => {
  const navigate = useNavigate()
  const { account } = useAuthContext()

  const [error, analyze] = useAnalyzeRequired(['region', 'content'])
  const [regions, setRegions] = useState<RegionData[]>([])
  const [appeal, _, setAppealProp] = useObjectState({
    region: 74,
    category: undefined as number | undefined,
    content: '',
  })

  const [authorize] = useAuthorizeMutation()

  const listRegionsResponse = useListRegionsQuery({})

  useStatusEffect(() => setRegions(listRegionsResponse.data ?? []), [listRegionsResponse])

  const handleSubmit = () => {
    if (account?.verified) {
      if (!analyze(appeal)) {
        return
      }

      enqueueSnackbar({
        variant: 'success',
        message: 'Обращение направлено успешно',
        autoHideDuration: 2000,
      })

      !!onClose && onClose()
      return
    }

    if (!!account) {
      navigate(`/gosuslugi/?referer=/`)
      !!onClose && onClose()
    }

    authorize({})
  }

  return (
    <Modal showClose title={'Сообщите, что вас волнует'} open={open} onClose={onClose}>
      <Stack spacing={3} minWidth={600}>
        <TextBox
          multiline
          error={error.content}
          label={'Опишите ситуацию *'}
          placeholder={'Суть проблемы или предложения'}
          rows={5}
          value={appeal.content}
          onChange={(value) => setAppealProp({ content: value })}
        />
        <Stack spacing={1}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Box width={24} border={'3px solid orange'} />
            <Typography fontWeight={'bold'}>Несколько проблем?</Typography>
          </Stack>
          <Typography color={'gray'} variant={'body2'}>
            Рекомендуется указывать информацию только об одной проблеме или предложении, так вопрос быстрее дойдет до адресата
          </Typography>
        </Stack>
        <FileUpload />
        <Autocomplete
          label={'Ваш регион *'}
          error={error.region}
          options={regions.map((item) => ({ label: item.name, value: item.id }))}
          value={appeal.region ?? null}
          onChange={(value) => setAppealProp({ region: value ?? undefined })}
        />
        <Autocomplete
          label={'Категория'}
          options={[
            {
              value: 187,
              label: 'Прямая линия',
            },
            {
              value: 3,
              label: 'Медицина',
            },
            {
              value: 1,
              label: 'Иное',
            },
          ]}
          value={appeal.category}
          onChange={(value) => setAppealProp({ category: value })}
        />
        <Stack>
          <Checkbox label={'Отображать сообщение или обращение на портале госуслуг в открытом доступе'} />
          <Checkbox label={'Я соглашаюсь с правилами подачи сообщений и обращений'} />
          <Checkbox label={'Коллективное обращение'} />
        </Stack>
        <Accordion disableGutters elevation={0} sx={{ boxShadow: 'none', border: 'none' }}>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <Typography color={'gray'} variant={'body2'}>
              Если Вы хотите, чтобы обращение рассматривалось в соответствии с 59-ФЗ в 30-дневный срок, отметьте на форме
            </Typography>
          </AccordionSummary>
          <Checkbox label={'Подать обращение по 59-ФЗ'} />
        </Accordion>
        <Button color={'info'} variant={'outlined'} startIcon={<EsiaIcon />} onClick={handleSubmit}>
          {account?.verified ? 'Отправить обращение' : !account ? 'Войти в аккаунт' : 'Подтвердить через ЕСИА'}
        </Button>
      </Stack>
    </Modal>
  )
}

export default GosuslugiModal
