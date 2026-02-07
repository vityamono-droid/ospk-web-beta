import { useGetClientQuery } from '@api/admin/client.api'
import Checkbox from '@components/new/Checkbox'
import PageHeader from '@components/PageHeader'
import TextBox from '@components/TextBox'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const DetailsPage = () => {
  const { id } = useParams()
  const response = useGetClientQuery(id ?? '', {
    skip: !id
  })

  const [client, setClient] = useState<any | undefined>()

  useEffect(() => {
    if (!response.isSuccess) {
      return
    }

    setClient(response.data)
  }, [response.status])

  return (
    <>
      <PageHeader title={'Редактировать клиента'} />
      {response.isSuccess && !!client && (
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Stack direction={'row'} spacing={1}>
              <TextBox size={'small'} fullWidth label={'Телефон'} value={client.phone} />
              <TextBox size={'small'} fullWidth label={'Email'} value={client.email} />
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextBox size={'small'} fullWidth label={'Фамилия'} value={client.lastName} />
              <TextBox size={'small'} fullWidth label={'Имя'} value={client.firstName} />
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextBox size={'small'} label={'Отчество'} value={client.patronymic} />
              <Checkbox label={'Статус'} checked={!client.disabled} />
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default DetailsPage
