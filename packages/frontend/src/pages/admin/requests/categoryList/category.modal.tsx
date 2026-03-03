import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '@api/admin/requests'
import Modal from '@components/Modal'
import Checkbox from '@components/new/Checkbox'
import TextBox from '@components/new/TextBox'
import SaveCancelButton from '@components/SaveCancelButton'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import Stack from '@mui/material/Stack'
import type { UpsertCategoryDetails } from '@ospk/web-models/requests'

interface CategoryModalProps {
  id?: string
  open?: boolean
  onClose?: Callback
}

const CategoryModal = ({ id, open, onClose }: CategoryModalProps) => {
  const [error, analyze] = useAnalyzeRequired<UpsertCategoryDetails>(['label'])
  const [category, setCategory, setCategoryProp] = useObjectState<UpsertCategoryDetails>({
    label: '',
    disabled: false,
    removedAt: null,
  })

  const [addCategory, addResponse] = useAddCategoryMutation()
  const [updateCategory, updateResponse] = useUpdateCategoryMutation()
  const [deleteCategory, deleteResponse] = useDeleteCategoryMutation()

  const getResponse = useGetCategoryQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setCategory(getResponse.data), [getResponse])
  useStatusEffect(() => !!onClose && onClose(), [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteCategory(id)

  const handleSave = () => {
    const data = {
      ...category,
      label: category.label?.trim(),
    }

    if (!analyze(data)) {
      return
    }

    if (!!id) {
      updateCategory({ id, data })
    } else {
      addCategory(data)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменение' : 'Добавление'} каталога`} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={400}>
        <TextBox
          error={error.label}
          label={'Название'}
          value={category.label ?? ''}
          onChange={(value) => setCategoryProp({ label: value || null })}
        />
        <Checkbox label={'Активна'} checked={!category.disabled} onChange={(value) => setCategoryProp({ disabled: !value })} />
        <SaveCancelButton
          showRemoved={!!id}
          removed={!!category.removedAt}
          onCancel={onClose}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default CategoryModal
