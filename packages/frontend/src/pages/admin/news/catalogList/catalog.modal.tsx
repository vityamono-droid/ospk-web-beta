import FileUpload from '@components/FileUpload'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import SaveCancelButton from '@components/SaveCancelButton'
import Switch from '@components/Switch'
import Stack from '@mui/material/Stack'

import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import { useEffect } from 'react'
import {
  useAddCatalogMutation,
  useDeleteCatalogMutation,
  useGetCatalogQuery,
  useUpdateCatalogMutation,
} from '@api/admin/articles/catalogs.api'

import type { UpsertArticleCatalog } from '@ospk/web-models/articles'

interface CatalogModalProps {
  id?: string
  open?: boolean
  onClose?: Callback
}

const CatalogModal = ({ id, open, onClose }: CatalogModalProps) => {
  const getResponse = useGetCatalogQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const [addCatalog, addResponse] = useAddCatalogMutation()
  const [updateCatalog, updateResponse] = useUpdateCatalogMutation()
  const [deleteCatalog, deleteResponse] = useDeleteCatalogMutation()

  const [error, analyze] = useAnalyzeRequired<UpsertArticleCatalog>(['label'])
  const [catalog, setCatalog, setCatalogProp] = useObjectState<UpsertArticleCatalog>({
    label: '',
    banner: null,
    description: null,
    disabled: false,
    removedAt: null,
  })

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setCatalog(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (![addResponse.isSuccess, updateResponse.isSuccess, deleteResponse.isSuccess].includes(true)) {
      return
    }

    !!onClose && onClose()
  }, [addResponse.status, updateResponse.status, deleteResponse.status])

  const handleDelete = () => !!id && deleteCatalog(id)

  const handleSave = () => {
    const data = {
      ...catalog,
      label: catalog.label.trim(),
      description: catalog.description?.trim() ?? null,
    }

    if (!analyze(data)) {
      return
    }

    if (!!id) {
      updateCatalog({ id, data })
    } else {
      addCatalog(data)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} каталог`} open={open} onClose={onClose}>
      <Stack spacing={2} minWidth={400}>
        <TextBox
          label={'Название'}
          error={error.label}
          value={catalog.label}
          onChange={(value) => setCatalogProp({ label: value })}
        />
        <TextBox
          label={'Описание'}
          multiline
          rows={3}
          value={catalog.description ?? ''}
          onChange={(value) => setCatalogProp({ description: value })}
        />
        <Switch
          label={catalog.disabled ? 'Не активно' : 'Активно'}
          checked={!catalog.disabled}
          onChange={(value) => setCatalogProp({ disabled: !value })}
        />
        <FileUpload />
        <SaveCancelButton
          removed={!!catalog.removedAt}
          showRemoved={!!id}
          onDelete={handleDelete}
          onCancel={onClose}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default CatalogModal
