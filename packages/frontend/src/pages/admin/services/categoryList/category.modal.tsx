import { useListCatalogsQuery } from '@api/admin/serviceCatalogs.api'
import { useAddCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from '@api/admin/serviceCategories.api'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import Autocomplete from '@components/Autocomplete'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import type { AddServiceCategoryRequest, UpdateServiceCategoryRequest } from '@ospk/web-models/services'
import { useEffect, useState } from 'react'
import Switch from '@components/Switch'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'

interface CategoryModalProps {
  id?: string
  open: boolean
  onClose: Callback
}

const CategoryModal = ({ id, open, onClose }: CategoryModalProps) => {
  const getResponse = useGetCategoryQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })
  const listCatalogsResponse = useListCatalogsQuery({})

  const [addRequest, addResponse] = useAddCategoryMutation()
  const [updateRequest, updateResponse] = useUpdateCategoryMutation()

  const [category, setCategory] = useState<UpdateServiceCategoryRequest>({
    label: '',
    description: '',
    catalogId: null as any,
    disabled: false,
  })
  const [error, analyze] = useAnalyzeRequired<UpdateServiceCategoryRequest>(['label', 'catalogId'])

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setCategory(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (!addResponse.isSuccess) {
      return
    }

    onClose()
  }, [addResponse.status])

  useEffect(() => {
    if (!updateResponse.isSuccess) {
      return
    }

    onClose()
  }, [updateResponse.status])

  const handlePropChange = (data: UpdateServiceCategoryRequest) => {
    setCategory({
      ...category,
      ...data,
    })
  }

  const handleDelete = () => {
    if (!id) {
      return
    }

    updateRequest({
      id: id,
      data: {
        removedAt: category.removedAt != null || !!category.removedAt ? null : new Date(),
      },
    })
  }

  const handleSave = () => {
    if (!analyze(category)) {
      return
    }

    if (!!id) {
      updateRequest({
        id: id,
        data: category,
      })
    } else {
      addRequest(category as AddServiceCategoryRequest)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} категорию`} open={open} onClose={onClose}>
      <Stack spacing={2} width={400}>
        <TextBox
          label={'Название'}
          error={error.label}
          value={category.label ?? ''}
          onChange={(value) => handlePropChange({ label: value })}
        />
        <TextBox
          label={'Описание'}
          rows={3}
          multiline
          error={error.description}
          value={category.description ?? ''}
          onChange={(value) => handlePropChange({ description: value })}
        />
        <Autocomplete
          label={'Каталог'}
          error={error.catalogId}
          options={(listCatalogsResponse.data ?? []).map((item) => ({ label: item.label, value: item.id }))}
          value={category.catalogId ?? null}
          onChange={(value) => handlePropChange({ catalogId: value ?? undefined })}
        />
        <Switch
          label={category.disabled ? 'Включить' : 'Отключить'}
          checked={typeof category.disabled === 'undefined' ? true : !category.disabled}
          onChange={(value) => handlePropChange({ disabled: !value })}
        />
        <Stack spacing={2} direction={'row'} justifyContent={'flex-end'}>
          {!!id && (
            <Button color={'error'} onClick={handleDelete}>
              {category.removedAt != null || !!category.removedAt ? 'Восстановить' : 'Удалить'}
            </Button>
          )}
          <Button onClick={onClose}>Отмена</Button>
          <Button color={'success'} variant={'outlined'} onClick={handleSave}>
            Сохранить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  )
}

export default CategoryModal
