import BannerUpload from '@components/BannerUpload'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import SaveCancelButton from '@components/SaveCancelButton'
import Switch from '@components/Switch'
import Stack from '@mui/material/Stack'

import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import { useState } from 'react'
import {
  useAddCatalogMutation,
  useDeleteCatalogMutation,
  useGetCatalogQuery,
  useUpdateCatalogMutation,
} from '@api/admin/articles/catalogs.api'
import useStatusEffect from '@hooks/useStatusEffect'

import { enqueueSnackbar } from 'notistack'

import type { UpsertArticleCatalogDetails } from '@ospk/web-models/articles'

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

  const [banner, setBanner] = useState<File | null>()
  const [error, analyze] = useAnalyzeRequired<UpsertArticleCatalogDetails>(['label'])
  const [catalog, setCatalog, setCatalogProp] = useObjectState<UpsertArticleCatalogDetails>({
    label: '',
    banner: null,
    description: null,
    disabled: false,
    removedAt: null,
  })

  useStatusEffect(() => setCatalog(getResponse.data), [getResponse])

  useStatusEffect(() => !!onClose && onClose(), [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteCatalog(id)

  const handleSave = () => {
    const data = {
      ...catalog,
      label: catalog.label.trim(),
      description: catalog.description?.trim() ?? null,
    }

    if (!analyze(data)) {
      enqueueSnackbar({
        message: 'Ошибка валидации данных',
        variant: 'error',
      })
      return
    }

    const formData = new FormData()
    !!banner && formData.append('banner', banner)
    formData.append('data', JSON.stringify(data))

    if (!!id) {
      updateCatalog({ id, data: formData })
    } else {
      addCatalog(formData)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} каталог`} open={open} onClose={onClose}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <BannerUpload
            file={catalog.banner}
            onChange={(value) => setBanner(value)}
            onPreview={(value) => setCatalogProp({ banner: value })}
          />
          <Stack spacing={2} width={{ xs: 'reset', md: 300 }}>
            <TextBox
              label={'Название *'}
              error={error.label}
              value={catalog.label}
              maxLength={64}
              onChange={(value) => setCatalogProp({ label: value })}
            />
            <TextBox
              label={'Описание'}
              multiline
              rows={3}
              maxLength={128}
              value={catalog.description ?? ''}
              onChange={(value) => setCatalogProp({ description: value || null })}
            />
            <Switch label={'Активен'} checked={!catalog.disabled} onChange={(value) => setCatalogProp({ disabled: !value })} />
          </Stack>
        </Stack>
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
