import { useGetServiceQuery } from '@api/admin/services.api'
import Autocomplete from '@components/Autocomplete'
import FileUpload from '@components/FileUpload'
import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'
import Switch from '@components/Switch'
import TextEditor from '@components/TextEditor'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import type { UpdateServiceRequest, AddServiceRequest } from '@ospk/web-models/services'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const useAddService = () => {

  const [error, analyze] = useAnalyzeRequired<AddServiceRequest>(['label', 'vat', 'price', 'amountType', 'catalogId'])
  const [service, setService] = useState<AddServiceRequest>({
    label: '',
    vat: 15,
    price: 100,
    amountType: 'FINITE',
    forLegals: false,
    disabled: false,
    catalogId: '',
    departments: []
  })

  return {
    service,
    setService,
    error,
    analyze,
  }
}

const useUpdateService = (id: string) => {
  const getResponse = useGetServiceQuery(id)

  const [error, analyze] = useAnalyzeRequired<UpdateServiceRequest>(['label', 'vat', 'price', 'amountType', 'catalogId'])
  const [service, setService] = useState<UpdateServiceRequest>({})

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setService(getResponse.data)
  }, [getResponse.status])

  return {
    service,
    setService,
    error,
    analyze,
  }
}

const ServicePage = () => {
  const { id } = useParams()
  const { service, setService, /* error, analyze */ } = !!id ? useUpdateService(id) : useAddService()

  const handlePropChange = (data: any) => {
    setService({
      ...service,
      ...data,
    })
  }

  return (
    <>
      <Stack spacing={1}>
        <PageHeader title={`${!!id ? 'Изменение' : 'Добавление'} услуги`} />
        <TextBox label={'Название'} value={service.label} onChange={(value) => handlePropChange({ label: value })} />
        <Stack direction={'row'} spacing={1}>
          <TextBox fullWidth label={'Цена'} />
          <Autocomplete fullWidth label={'НДС'} />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Autocomplete fullWidth label={'Исчисляемое'} />
          <Autocomplete fullWidth label={'Единица измерения'} />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Switch label={'Для юр лиц'} />
          <Switch label={'Включить'} />
        </Stack>
        <Autocomplete label={'Каталог'} />
        <Autocomplete label={'Категория'} />
        <Autocomplete label={'Отделения'} />
        <FileUpload />
      </Stack>
      <Box mt={1} flex={1} gap={1} display={'flex'} flexDirection={'column'}>
        <TextEditor editable content={service.content ?? ''} />
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button color={'error'}>Удалить</Button>
          <Button>Отмена</Button>
          <Button color={'success'} variant={'outlined'}>
            Сохранить
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default ServicePage
