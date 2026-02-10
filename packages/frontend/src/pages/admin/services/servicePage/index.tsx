import Autocomplete from '@components/Autocomplete'
import FileUpload from '@components/FileUpload'
import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'
import Switch from '@components/Switch'
import TextEditor from '@components/TextEditor'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
} from '@api/admin/services/services.api'
import { useListCatalogsQuery } from '@api/admin/services/catalogs.api'
import { useListCategoriesQuery } from '@api/admin/services/categories.api'
import { useListUnitsQuery } from '@api/admin/services/units.api'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import { type UpsertServiceDetails } from '@ospk/web-models/services'
import useObjectState from '@hooks/useObjectState'
import SaveCancelButton from '@components/SaveCancelButton'

const ServicePage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const getResponse = useGetServiceQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const [error, analyze] = useAnalyzeRequired<UpsertServiceDetails>(['label', 'vat', 'price', 'catalogId'])
  const [service, setService, setServiceProp] = useObjectState<UpsertServiceDetails>({
    label: '',
    banner: null,
    content: null,
    vat: 0,
    price: 100,
    forLegals: false,
    disabled: false,
    amountType: 'FINITE',
    unitId: null,
    catalogId: '',
    categoryId: null,
    removedAt: null,
    departments: [],
  })

  const listCatalogResponse = useListCatalogsQuery({})
  const listCategoryResponse = useListCategoriesQuery({}, { skip: !service.catalogId })
  const listUnitResponse = useListUnitsQuery({}, { skip: service.amountType != 'FINITE' })

  const [addService, addResponse] = useAddServiceMutation()
  const [updateService, updateResponse] = useUpdateServiceMutation()
  const [deleteService, deleteResponse] = useDeleteServiceMutation()

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setService(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (![addResponse.isSuccess, updateResponse.isSuccess, deleteResponse.isSuccess].includes(true)) {
      return
    }

    if (addResponse.isSuccess) {
      navigate(addResponse.data)
      return
    }

    if (updateResponse.isSuccess) {
      getResponse.refetch()
      return
    }

    navigate(-1)
  }, [addResponse.status, updateResponse.status, deleteResponse.status])

  const handleDelete = () => !!id && deleteService(id)

  const handleSave = () => {
    const data = {
      ...service,
    }

    console.log(service)
    if (!analyze(service)) {
      return
    }

    if (!!id) {
      updateService({ id: id, data })
    } else {
      addService(data)
    }
  }

  return (
    <>
      <Stack spacing={1}>
        <PageHeader title={`${!!id ? 'Изменение' : 'Добавление'} услуги`} backTo={'../'} />
        <TextBox
          label={'Название'}
          error={error.label}
          value={service.label}
          onChange={(value) => setServiceProp({ label: value })}
        />
        <Stack direction={'row'} spacing={1}>
          <TextBox
            fullWidth
            label={'Цена'}
            error={error.price}
            value={service.price}
            onChange={(value) => setServiceProp({ price: value })}
          />
          <Autocomplete
            fullWidth
            label={'НДС'}
            error={error.vat}
            value={service.vat}
            options={[
              {
                label: 'Не облагается',
                value: 0,
              },
              {
                label: '8%',
                value: 8,
              },
              {
                label: '10%',
                value: 10,
              },
              {
                label: '18%',
                value: 18,
              },
              {
                label: '20%',
                value: 20,
              },
            ]}
            onChange={(value) => setServiceProp({ vat: value })}
          />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Autocomplete
            fullWidth
            label={'Исчисляемое'}
            error={error.amountType}
            options={[
              {
                label: 'Исчисляемое',
                value: 'FINITE',
              },
              {
                label: 'Неисчисляемое',
                value: 'INFINITE',
              },
            ]}
            value={service.amountType}
            onChange={(value) => setServiceProp({ amountType: value, unitId: null })}
          />
          <Autocomplete
            fullWidth
            label={'Единица измерения'}
            loading={listUnitResponse.isLoading}
            disabled={service.amountType != 'FINITE'}
            options={listUnitResponse.data?.map((item) => ({ label: item.label, value: item.id }))}
            value={service.unitId}
            onChange={(value) => setServiceProp({ unitId: value })}
          />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Switch label={'Для юр лиц'} value={service.forLegals} onChange={(value) => setServiceProp({ forLegals: value })} />
          <Switch label={'Включить'} value={!service.disabled} onChange={(value) => setServiceProp({ disabled: !value })} />
        </Stack>
        <Autocomplete
          label={'Каталог'}
          error={error.catalogId}
          loading={listCatalogResponse.isLoading}
          options={listCatalogResponse.data?.map((item) => ({ label: item.label, value: item.id }))}
          value={service.catalogId}
          onChange={(value) => setServiceProp({ catalogId: value })}
        />
        <Autocomplete
          label={'Категория'}
          loading={listCategoryResponse.isLoading}
          disabled={!service.catalogId}
          options={listCategoryResponse.data?.map((item) => ({ label: item.label, value: item.id }))}
          value={service.categoryId}
          onChange={(value) => setServiceProp({ categoryId: value })}
        />
        <Autocomplete
          label={'Отделения'}
          value={service.departments}
          onChange={(value) => setServiceProp({ departments: value })}
        />
        <FileUpload label={'Баннер'} subLabel={'изображение'} fileTypes={['.png', '.jpg']} />
      </Stack>
      <Box mt={1} flex={1} gap={1} display={'flex'} flexDirection={'column'}>
        <TextEditor editable content={service.content ?? ''} />
        <SaveCancelButton
          showRemoved={!!id}
          removed={!!service.removedAt}
          onDelete={handleDelete}
          onCancel={() => navigate(-1)}
          onSave={handleSave}
        />
      </Box>
    </>
  )
}

export default ServicePage
