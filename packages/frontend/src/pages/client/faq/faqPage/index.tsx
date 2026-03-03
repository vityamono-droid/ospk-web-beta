import Autocomplete from '@components/Autocomplete'
import Avatar from '@mui/material/Avatar'
import CommentView from '@components/CommentView'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import SaveCancelButton from '@components/SaveCancelButton'
import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'

import EditIcon from '@mui/icons-material/Edit'

import { useState } from 'react'
import { useParams } from 'react-router'
import { useAuthContext } from '@pages/auth/auth.context'
import { useGetRequestQuery } from '@api/client/requests/categories.api'
import useStatusEffect from '@hooks/useStatusEffect'
import useObjectState from '@hooks/useObjectState'

import type { RequestData, UpsertRequestData } from '@ospk/web-models/requests'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import { useUpdateRequestMutation } from '@api/client/requests/requests.api'
import Button from '@mui/material/Button'

const FaqPage = () => {
  const { id } = useParams()
  const { account } = useAuthContext()

  const [edit, setEdit] = useState(false)
  const [error, analyze] = useAnalyzeRequired<Omit<UpsertRequestData, 'categoryId' | 'removedAt'>>([
    'label',
    'content',
    'status',
  ])
  const [toUpdate, setToUpdate, setToUpdateProp] = useObjectState<Partial<Omit<UpsertRequestData, 'categoryId' | 'removedAt'>>>(
    {},
  )
  const [request, setRequest] = useState<RequestData>()

  const [updateRequest, updateResponse] = useUpdateRequestMutation()

  const getResponse = useGetRequestQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setRequest(getResponse.data), [getResponse])
  useStatusEffect(() => {
    setEdit(false)
    getResponse.refetch()
  }, [updateResponse])

  const handleReject = () => {
    !!id &&
      updateRequest({
        id,
        data: {
          status: 'REJECTED',
        },
      })
  }

  const handleFulfill = () => {
    !!id &&
      updateRequest({
        id,
        data: {
          status: 'FULFILLED',
        },
      })
  }

  const handleEdit = () => {
    setToUpdate(request)
    setEdit(true)
  }

  const handleCancel = () => {
    setEdit(false)
    setToUpdate({})
  }

  const handleSave = () => {
    const data = {
      label: toUpdate.label?.trim() ?? '',
      content: toUpdate.content?.trim() ?? '',
      status: toUpdate.status ?? 'PENDING',
      profileId: request?.profileId ?? '',
    }

    if (!analyze(data)) {
      return
    }

    !!id && updateRequest({ id, data })
  }

  return (
    <>
      {!!request && (
        <>
          <Stack flex={1} spacing={2}>
            <Stack>
              <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                <PageHeader title={request.label} />
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  {(account?.roles.includes('admin') || account?.roles.includes('moder')) && request.status === 'PENDING' && (
                    <>
                      <Button color={'error'} variant={'outlined'} onClick={handleReject}>
                        Отклонить
                      </Button>
                      <Button onClick={handleFulfill}>Завершить</Button>
                    </>
                  )}
                  {account?.profileId == request.profileId && (
                    <IconButton disabled={edit || request.status !== 'PENDING'} onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Stack>
              </Stack>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar src={account?.avatar ?? ''} sx={{ width: 32, height: 32 }} />
                <Typography variant={'h6'}>{request.fullName}</Typography>
              </Stack>
            </Stack>
            {edit && (
              <TextBox
                label={'Название *'}
                error={error.label}
                value={toUpdate.label ?? ''}
                onChange={(value) => setToUpdateProp({ label: value || null })}
              />
            )}
            {edit ? (
              <Autocomplete
                label={'Статус *'}
                error={error.status}
                options={[
                  {
                    label: 'Ожидание',
                    value: 'PENDING',
                  },
                  {
                    label: 'Завершен',
                    value: 'FULFILLED',
                  },
                ]}
                value={toUpdate.status ?? 'PENDING'}
                onChange={(value) => setToUpdateProp({ status: value || null })}
              />
            ) : (
              <Stack direction={'row'} spacing={1} alignItems={'baseline'}>
                <Typography color={'gray'} variant={'body2'}>
                  Статус:
                </Typography>
                <Typography>
                  {request.status === 'REJECTED' ? 'Отклонен' : request.status === 'PENDING' ? 'Ожидание' : 'Завершен'}
                </Typography>
              </Stack>
            )}
            {edit ? (
              <TextBox
                multiline
                label={'Описание *'}
                error={error.content}
                rows={6}
                value={toUpdate.content ?? ''}
                onChange={(value) => setToUpdateProp({ content: value || null })}
              />
            ) : (
              <Stack spacing={1}>
                <Typography color={'gray'} variant={'body2'}>
                  Содержание:
                </Typography>
                <Typography>{request.content}</Typography>
              </Stack>
            )}
            {!edit && <CommentView forumPostId={id} />}
          </Stack>
          {edit && <SaveCancelButton onCancel={handleCancel} onSave={handleSave} />}
        </>
      )}
    </>
  )
}

export default FaqPage
