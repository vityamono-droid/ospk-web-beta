import Autocomplete from '@components/Autocomplete'
import Modal from '@components/Modal'
import SaveCancelButton from '@components/SaveCancelButton'
import Stack from '@mui/material/Stack'
import Switch from '@components/Switch'
import TextBox from '@components/new/TextBox'

import { useEffect } from 'react'
import { useListCatalogsQuery } from '@api/admin/articles/catalogs.api'
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useListCategoriesQuery,
  useUpdateCategoryMutation,
} from '@api/admin/articles/categories.api'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'

import toAcOptions from '@utils/toAcOptions'

import type { UpsertArticleCategory } from '@ospk/web-models/articles'

interface CategoryModalProps {
  id?: string
  open?: boolean
  onClose?: Callback
}

const CategoryModal = ({ id, open, onClose }: CategoryModalProps) => {
  const getResponse = useGetCategoryQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const [addCategory, addResponse] = useAddCategoryMutation()
  const [updateCategory, updateResponse] = useUpdateCategoryMutation()
  const [deleteCategory, deleteResponse] = useDeleteCategoryMutation()

  const [error, analyze] = useAnalyzeRequired<UpsertArticleCategory>(['label', 'catalogId'])
  const [category, setCategory, setCategoryProp] = useObjectState<UpsertArticleCategory>({
    catalogId: '',
    parentId: null,
    label: '',
    disabled: false,
    removedAt: null,
  })

  const listCatalogsResponse = useListCatalogsQuery({ activeOnly: true })
  const listCategoriesResponse = useListCategoriesQuery(
    {
      catalogId: category.catalogId,
      activeOnly: true,
    },
    {
      skip: !category.catalogId,
      refetchOnMountOrArgChange: true,
    },
  )

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setCategory(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (![addResponse.isSuccess, updateResponse.isSuccess, deleteResponse.isSuccess].includes(true)) {
      return
    }

    !!onClose && onClose()
  }, [addResponse.status, updateResponse.status, deleteResponse.status])

  const handleDelete = () => !!id && deleteCategory(id)

  const handleSave = () => {
    const data = {
      ...category,
      label: category.label.trim(),
      catalogId: category.catalogId.trim(),
      parentId: category.parentId || null
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
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} категорию`} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={400}>
        <TextBox
          label={'Название'}
          error={error.label}
          value={category.label}
          onChange={(value) => setCategoryProp({ label: value })}
        />
        <Autocomplete
          label={'Каталог'}
          error={error.catalogId}
          loading={listCatalogsResponse.isLoading}
          options={toAcOptions(listCatalogsResponse.data)}
          value={category.catalogId}
          onChange={(value) => setCategoryProp({ catalogId: value, parentId: '' })}
        />
        <Autocomplete
          label={'Родитель'}
          disabled={!category.catalogId}
          options={toAcOptions(listCategoriesResponse.data)}
          value={category.parentId}
          onChange={(value) => setCategoryProp({ parentId: value })}
        />
        <Switch
          label={category.disabled ? 'Не активно' : 'Активно'}
          checked={!category.disabled}
          onChange={(value) => setCategoryProp({ disabled: !value })}
        />
        <SaveCancelButton
          removed={!!category.removedAt}
          showRemoved={!!id}
          onDelete={handleDelete}
          onCancel={onClose}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default CategoryModal
