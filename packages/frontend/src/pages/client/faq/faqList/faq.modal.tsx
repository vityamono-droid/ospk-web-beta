import Autocomplete from '@components/Autocomplete'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import SaveCancelButton from '@components/SaveCancelButton'
import Stack from '@mui/material/Stack'

import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import { useAddRequestMutation } from '@api/client/requests/requests.api'
import { useListCategoriesQuery } from '@api/client/requests/categories.api'
import { useAuthContext } from '@pages/auth/auth.context'
import { useState } from 'react'

import type { CategoryData, UpsertRequestData } from '@ospk/web-models/requests'

import toAcOptions from '@utils/toAcOptions'
import { useNavigate } from 'react-router'

interface FaqModalProps {
  open?: boolean
  onClose?: Callback
}

const FaqModal = ({ open, onClose }: FaqModalProps) => {
  const navigate = useNavigate()

  const { account } = useAuthContext()

  const [error, analyze] = useAnalyzeRequired<UpsertRequestData>(['label', 'content', 'status', 'categoryId'])
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [request, _, setRequestProps] = useObjectState<UpsertRequestData>({
    label: '',
    content: '',
    status: 'PENDING',
    categoryId: '',
    profileId: account ? account.profileId : '',
    removedAt: null,
  })

  const [addRequest, addRequestResponse] = useAddRequestMutation()

  const listResponse = useListCategoriesQuery({})

  useStatusEffect(() => setCategories(listResponse.data ?? []), [listResponse])
  useStatusEffect(() => addRequestResponse.data && navigate(addRequestResponse.data), [addRequestResponse])

  const handleSave = () => {
    const data = {
      ...request,
      label: request.label?.trim(),
      content: request.content?.trim(),
    }

    if (!analyze(data)) {
      return
    }

    addRequest(data)
  }

  return (
    <Modal title={'Задать вопрос'} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={400}>
        <TextBox
          label={'Название *'}
          error={error.label}
          value={request.label ?? ''}
          onChange={(value) => setRequestProps({ label: value || null })}
        />
        <Autocomplete
          label={'Категория *'}
          error={error.categoryId}
          options={toAcOptions(categories)}
          value={request.categoryId ?? ''}
          onChange={(value) => setRequestProps({ categoryId: value || null })}
        />
        <TextBox
          multiline
          label={'Описание *'}
          error={error.content}
          rows={6}
          value={request.content ?? ''}
          onChange={(value) => setRequestProps({ content: value || null })}
        />
        <SaveCancelButton onCancel={onClose} onSave={handleSave} />
      </Stack>
    </Modal>
  )
}

export default FaqModal
