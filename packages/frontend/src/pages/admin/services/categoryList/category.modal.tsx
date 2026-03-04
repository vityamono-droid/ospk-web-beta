import Autocomplete from '@components/Autocomplete'
import SaveCancelButton from '@components/SaveCancelButton'
import Stack from '@mui/material/Stack'
import Switch from '@components/Switch'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'

import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useStatusEffect from '@hooks/useStatusEffect'
import useObjectState from '@hooks/useObjectState'
import { useState } from 'react'
import { useListCatalogsQuery } from '@api/admin/services/catalogs.api'
import {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@api/admin/services/categories.api'

import toAcOptions from '@utils/toAcOptions'

import type { ServiceCatalogDetails, UpsertServiceCategoryDetails } from '@ospk/web-models/services'

interface CategoryModalProps {
  id?: string
  open?: boolean
  onClose?: Callback
}

const CategoryModal = ({ id, open, onClose }: CategoryModalProps) => {
  const [error, analyze] = useAnalyzeRequired<UpsertServiceCategoryDetails>(['label', 'catalogId'])
  const [catalogs, setCatalogs] = useState<ServiceCatalogDetails[]>([])
  const [category, setCategory, setCategoryProp] = useObjectState<UpsertServiceCategoryDetails>({
    label: '',
    description: '',
    catalogId: '',
    disabled: false,
    removedAt: null,
  })

  const [addCategory, addResponse] = useAddCategoryMutation()
  const [updateCategory, updateResponse] = useUpdateCategoryMutation()
  const [deleteCategory, deleteResponse] = useDeleteCategoryMutation()

  const listCatalogsResponse = useListCatalogsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  )

  const getResponse = useGetCategoryQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setCategory(getResponse.data), [getResponse])
  useStatusEffect(() => setCatalogs(listCatalogsResponse.data ?? []), [listCatalogsResponse])
  useStatusEffect(() => !!onClose && onClose(), [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteCategory(id)

  const handleSave = () => {
    const data = category

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
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} категорию`} open={open} onClose={onClose}>
      <Stack spacing={2} width={400}>
        <TextBox
          label={'Название *'}
          error={error.label}
          value={category.label ?? ''}
          onChange={(value) => setCategoryProp({ label: value || null })}
        />
        <TextBox
          label={'Описание'}
          rows={3}
          multiline
          error={error.description}
          value={category.description ?? ''}
          onChange={(value) => setCategoryProp({ description: value || null })}
        />
        <Autocomplete
          label={'Каталог *'}
          error={error.catalogId}
          options={toAcOptions(catalogs)}
          value={category.catalogId ?? null}
          onChange={(value) => setCategoryProp({ catalogId: value || null })}
        />
        <Switch label={'Активна'} checked={!category.disabled} onChange={(value) => setCategoryProp({ disabled: !value })} />
        <SaveCancelButton
          showRemoved={!!id}
          removed={!!category.removedAt}
          onDelete={handleDelete}
          onCancel={onClose}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default CategoryModal
