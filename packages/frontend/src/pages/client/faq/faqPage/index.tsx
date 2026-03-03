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

import type { RequestData } from '@ospk/web-models/requests'

const FaqPage = () => {
  const { id } = useParams()
  const { account } = useAuthContext()

  const [edit, setEdit] = useState(false)
  const [request, setRequest, setRequestProps] = useObjectState<RequestData | undefined>(undefined)

  const getResponse = useGetRequestQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setRequest(getResponse.data), [getResponse])

  return (
    <>
      {!!request && (
        <>
          <Stack flex={1} spacing={2}>
            <Stack>
              <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                <PageHeader title={request.label} />
                {account?.profileId == request.profileId && (
                  <IconButton disabled={edit} onClick={() => setEdit(true)}>
                    <EditIcon />
                  </IconButton>
                )}
              </Stack>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar src={account?.avatar ?? ''} sx={{ width: 32, height: 32 }} />
                <Typography variant={'h6'}>{request.fullName}</Typography>
              </Stack>
            </Stack>
            {edit && (
              <TextBox
                label={'Название *'}
                value={request.label ?? ''}
                onChange={(value) => setRequestProps({ label: value || null })}
              />
            )}
            {edit ? (
              <Autocomplete
                label={'Статус *'}
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
                value={request.status ?? 'PENDING'}
                onChange={(value) => setRequestProps({ status: value || null })}
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
                rows={6}
                value={request.content ?? ''}
                onChange={(value) => setRequestProps({ content: value || null })}
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
          {edit && <SaveCancelButton onCancel={() => setEdit(false)} />}
        </>
      )}
    </>
  )
}

export default FaqPage
