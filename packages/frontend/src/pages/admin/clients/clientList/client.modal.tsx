import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetClientQuery,
  useUpdateClientMutation,
} from '@api/admin/clients/clients.api'
import { useListRolesQuery } from '@api/admin/clients/roles.api'
import Autocomplete from '@components/Autocomplete'
import MPhoneBox from '@components/MPhoneBox'
import Modal from '@components/Modal'
import SaveCancelButton from '@components/SaveCancelButton'
import TextBox from '@components/new/TextBox'
import useObjectState from '@hooks/useObjectState'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import type { UpsertClientDetails } from '@ospk/web-models/clients'
import { useEffect, useRef, useState } from 'react'
import ClearIcon from '@mui/icons-material/Close'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import PasswordBox from '@components/new/PasswordBox'

interface ClientModalProps {
  id?: string
  open: boolean
  onClose: Callback
}

const ClientModal = ({ id, open, onClose }: ClientModalProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const getResponse = useGetClientQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const listResponse = useListRolesQuery({})

  const [addClient, addResponse] = useAddClientMutation()
  const [updateClient, updateResponse] = useUpdateClientMutation()
  const [deleteClient, deleteResponse] = useDeleteClientMutation()

  const [avatarFile, setAvatarFile] = useState<File>()
  const [error, analyze] = useAnalyzeRequired<UpsertClientDetails>([
    'lastName',
    'firstName',
    'phone',
    'email',
    ...(!id ? ['password' as any] : []),
  ])
  const [client, setClient, setClientProp] = useObjectState<UpsertClientDetails>({
    lastName: '',
    firstName: '',
    patronymic: null,
    phone: '',
    email: '',
    roles: [],
    removedAt: null,
  })

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setClient(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (![addResponse.isSuccess, updateResponse.isSuccess, deleteResponse.isSuccess].includes(true)) {
      return
    }

    onClose()
  }, [addResponse.status, updateResponse.status, deleteResponse.status])

  const handleAvatarClick = () => {
    ref.current?.click()
  }

  const handleFileChange = (files: FileList | null) => {
    if (!files) {
      return
    }

    const raw = files.item(0)
    if (!raw) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setClientProp({ avatar: reader.result })
    }

    reader.readAsDataURL(raw)
    setAvatarFile(raw)
  }

  const handleClear = () => {
    setClientProp({ avatar: null })
    setAvatarFile(undefined)
  }

  const handleDelete = () => !!id && deleteClient(id)

  const handleSave = () => {
    const data = {
      ...client,
      firstName: client.firstName.trim(),
      lastName: client.lastName.trim(),
      patronymic: client.patronymic?.trim() || null,
      phone: client.phone.trim(),
      email: client.email.trim(),
      password: client.password?.trim(),
    }

    if (!analyze(data)) {
      return
    }

    const formData = new FormData()
    avatarFile && formData.append('avatar', avatarFile)
    formData.append('data', JSON.stringify(data))

    if (!!id) {
      updateClient({ id, data: formData })
    } else {
      addClient(formData)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} пользователя`} open={open} onClose={onClose}>
      <Stack spacing={4} width={600}>
        <Stack py={4} direction={'row'} justifyContent={'center'}>
          <input
            ref={ref}
            hidden
            type={'file'}
            accept='image/webp, image/jpg, image/png'
            onChange={({ target }) => handleFileChange(target.files)}
          />
          <Stack position={'relative'} alignItems={'center'} justifyContent={'center'} sx={{ height: 156, width: 156 }}>
            <Avatar
              src={client.avatar ?? undefined}
              sx={{ height: 148, width: 148 }}
              component={Button}
              onClick={handleAvatarClick}
            />
            <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <TextBox
            fullWidth
            label={'Фамилия *'}
            error={error.lastName}
            value={client.lastName}
            onChange={(value) => setClientProp({ lastName: value })}
          />
          <TextBox
            fullWidth
            label={'Имя *'}
            error={error.firstName}
            value={client.firstName}
            onChange={(value) => setClientProp({ firstName: value })}
          />
          <TextBox
            fullWidth
            label={'Отчество'}
            value={client.patronymic ?? ''}
            onChange={(value) => setClientProp({ patronymic: value })}
          />
          <TextBox
            fullWidth
            label={'Телефон *'}
            error={error.phone}
            slotProps={{
              input: {
                inputComponent: MPhoneBox as any,
              },
            }}
            value={client.phone}
            onChange={(value) => setClientProp({ phone: value })}
          />
          <TextBox fullWidth label={'Email *'} value={client.email} onChange={(value) => setClientProp({ email: value })} />
          {!id && (
            <PasswordBox
              fullWidth
              label={'Пароль *'}
              error={error.password}
              value={client.password ?? ''}
              onChange={(value) => setClientProp({ password: value })}
            />
          )}
          <Autocomplete
            fullWidth
            label={'Роли'}
            loading={listResponse.isLoading}
            options={listResponse.data?.map((item) => ({
              label: item.label ?? item.name,
              value: item.id,
            }))}
            value={client.roles[0]}
            onChange={(value) => setClientProp({ roles: [value] })}
          />
        </Stack>
        <SaveCancelButton
          showRemoved={!!id}
          removed={!!client.removedAt}
          onDelete={handleDelete}
          onCancel={onClose}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default ClientModal
