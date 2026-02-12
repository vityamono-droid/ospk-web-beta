import BannerUpload from '@components/BannerUpload'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import SaveCancelButton from '@components/SaveCancelButton'
import Switch from '@components/Switch'
import Stack from '@mui/material/Stack'

import {
  useAddCatalogMutation,
  useDeleteCatalogMutation,
  useGetCatalogQuery,
  useUpdateCatalogMutation,
} from '@api/admin/services/catalogs.api'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import { useState } from 'react'

import type { UpsertServiceCatalogDetails } from '@ospk/web-models/services'

interface CatalogModalProps {
  id?: string
  open: boolean
  onClose: Callback
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
  const [error, analyze] = useAnalyzeRequired<UpsertServiceCatalogDetails>(['label'])
  const [catalog, setCatalog, setCatalogProp] = useObjectState<UpsertServiceCatalogDetails>({
    label: '',
    disabled: false,
    banner: null,
    description: null,
    removedAt: null,
  })

  useStatusEffect(() => setCatalog(getResponse.data), [getResponse])
  useStatusEffect(() => onClose(), [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteCatalog(id)

  const handleSave = () => {
    const data = catalog
    if (!analyze(data)) {
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
    <Modal title={`${!!id ? 'Изменение' : 'Добавление'} каталога`} open={open} onClose={onClose}>
      <Stack spacing={2}>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <BannerUpload
            file={catalog.banner}
            onChange={(value) => setBanner(value)}
            onPreview={(value) => setCatalogProp({ banner: value })}
          />
          <Stack spacing={2} minWidth={{ xs: 'reset', md: 300 }}>
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
              rows={4}
              maxLength={128}
              value={catalog.description ?? ''}
              onChange={(value) => setCatalogProp({ description: value || null })}
            />
            <Switch label={'Активно'} checked={!catalog.disabled} onChange={(value) => setCatalogProp({ disabled: !value })} />
          </Stack>
        </Stack>
        <SaveCancelButton
          showRemoved={!!id}
          removed={!!catalog.removedAt}
          onDelete={handleDelete}
          onCancel={onClose}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default CatalogModal
