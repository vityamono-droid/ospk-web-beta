import Modal from '@components/Modal'
import Switch from '@components/Switch'
import Stack from '@mui/material/Stack'
import SaveCancelButton from '@components/SaveCancelButton'
import TextBox from '@components/new/TextBox'
import BannerUpload from '@components/BannerUpload'
import Autocomplete from '@components/Autocomplete'
import DateBox from '@components/new/DateBox'

import {
  useAddCarouselMutation,
  useDeleteCarouselMutation,
  useGetCarouselQuery,
  useUpdateCarouselMutation,
} from '@api/admin/carousels/carousels.api'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useStatusEffect from '@hooks/useStatusEffect'
import useObjectState from '@hooks/useObjectState'
import { useState } from 'react'

import type { UpsertCarouselDetails } from '@ospk/web-models/carousels'
import formatDate from '@utils/formatDate'

interface CarouselModalProps {
  id?: string
  open?: boolean
  onClose?: Callback
}

const placementOptions = [
  {
    label: 'Главная',
    value: 'HOME',
  },
  {
    label: 'Сервисы',
    value: 'SERVICES',
  },
  {
    label: 'Новости',
    value: 'NEWS',
  },
  {
    label: 'Профиль',
    value: 'PROFILE',
  },
]

const CarouselModal = ({ id, open, onClose }: CarouselModalProps) => {
  const getResponse = useGetCarouselQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const [addCarousel, addResponse] = useAddCarouselMutation()
  const [updateCarousel, updateResponse] = useUpdateCarouselMutation()
  const [deleteCarousel, deleteResponse] = useDeleteCarouselMutation()

  const [banner, setBanner] = useState<File | null>()
  const [error, analyze] = useAnalyzeRequired<UpsertCarouselDetails>(['banner', 'label', 'placement'])
  const [carousel, setCarousel, setCarouselProp] = useObjectState<UpsertCarouselDetails>({
    banner: '',
    link: null,
    label: '',
    description: null,
    durationFrom: null,
    durationTo: null,
    placement: 'HOME',
    disabled: false,
    removedAt: null,
  })

  useStatusEffect(() => setCarousel(getResponse.data), [getResponse])
  useStatusEffect(() => !!onClose && onClose(), [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteCarousel(id)

  const handleSave = () => {
    const data = {
      ...carousel,
    }

    if (!analyze(data)) {
      return
    }

    const formData = new FormData()
    !!banner && formData.append('banner', banner)
    formData.append('data', JSON.stringify(carousel))

    if (!!id) {
      updateCarousel({ id, data: formData })
    } else {
      addCarousel(formData)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} карусель`} open={open} onClose={onClose}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <BannerUpload
            file={carousel.banner}
            error={error.banner}
            onChange={(value) => setBanner(value)}
            onPreview={(value) => setCarouselProp({ banner: value })}
          />
          <Stack width={{ xs: 'reset', md: 300 }} spacing={2} justifyContent={'space-between'}>
            <TextBox
              label={'Название *'}
              error={error.label}
              maxLength={64}
              value={carousel.label}
              onChange={(value) => setCarouselProp({ label: value })}
            />
            <TextBox
              label={'Ссылка'}
              maxLength={256}
              value={carousel.link}
              onChange={(value) => setCarouselProp({ link: value })}
            />
            <Autocomplete
              label={'Размещение *'}
              error={error.placement}
              options={placementOptions}
              value={carousel.placement}
              onChange={(value) => setCarouselProp({ placement: value })}
            />
            <Stack direction={'row'} spacing={2}>
              <DateBox
                fullWidth
                label={'С'}
                value={formatDate(carousel.durationFrom)}
                onChange={(value) => setCarouselProp({ durationFrom: value || null })}
              />
              <DateBox
                fullWidth
                label={'До'}
                value={formatDate(carousel.durationTo)}
                onChange={(value) => setCarouselProp({ durationTo: value || null })}
              />
            </Stack>
          </Stack>
        </Stack>
        <TextBox
          multiline
          label={'Описание'}
          rows={3}
          maxLength={256}
          value={carousel.description ?? ''}
          onChange={(value) => setCarouselProp({ description: value || null })}
        />
        <Switch label={'Активна'} checked={!carousel.disabled} onChange={(value) => setCarouselProp({ disabled: !value })} />
        <SaveCancelButton
          showRemoved={!!id}
          removed={!!carousel.removedAt}
          onDelete={handleDelete}
          onCancel={onClose}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default CarouselModal
