import { useAddCatalogMutation, useGetCatalogQuery, useUpdateCatalogMutation } from '@api/admin/services/catalogs.api'
import FileUpload from '@components/FileUpload'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import Switch from '@components/Switch'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import type { AddServiceCatalogRequest, UpdateServiceCatalogRequest } from '@ospk/web-models/services'
import { useEffect, useState } from 'react'

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

  const [error, analyze] = useAnalyzeRequired<AddServiceCatalogRequest>(['label'])

  const [banner, setBanner] = useState<File | undefined>()
  const [catalog, setCatalog] = useState<UpdateServiceCatalogRequest>({
    label: '',
    disabled: false,
  })

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setCatalog(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (!updateResponse.isSuccess) {
      return
    }

    onClose()
  }, [updateResponse.status])

  useEffect(() => {
    if (!addResponse.isSuccess) {
      return
    }

    onClose()
  }, [addResponse.status])

  const handlePropChange = (data: UpdateServiceCatalogRequest) => {
    setCatalog({
      ...catalog,
      ...data,
    })
  }

  const handleDelete = () => {
    updateCatalog({
      id: id!,
      data: {
        removedAt: catalog.removedAt != null || !!catalog.removedAt ? null : new Date(),
      },
    })
  }

  const handleSave = () => {
    if (!analyze(catalog as AddServiceCatalogRequest)) {
      return
    }

    if (!!id) {
      updateCatalog({
        id: id,
        data: catalog,
      })
    } else {
      addCatalog(catalog as AddServiceCatalogRequest)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменение' : 'Добавление'} каталога`} open={open} onClose={onClose}>
      <Stack spacing={2} width={350}>
        <TextBox
          label={'Название *'}
          error={error.label}
          value={catalog.label ?? ''}
          onChange={(value) => handlePropChange({ label: value })}
        />
        <TextBox
          label={'Описание'}
          error={error.description}
          multiline
          rows={3}
          value={catalog.description ?? ''}
          onChange={(value) => handlePropChange({ description: value })}
        />
        <Switch
          label={catalog.disabled ? 'Включить' : 'Отключить'}
          checked={typeof catalog.disabled == 'undefined' ? true : !catalog.disabled}
          onChange={(value) => handlePropChange({ disabled: !value })}
        />
        <FileUpload
          value={!!banner ? [banner] : undefined}
          fileTypes={['image/jpg', 'image/png']}
          onChange={(value) => setBanner(Array.isArray(value) ? value[0] : value)}
        />
        <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
          {id && (
            <Button color={'error'} onClick={handleDelete}>
              {catalog.removedAt != null || !!catalog.removedAt ? 'Восстановить' : 'Удалить'}
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

export default CatalogModal
