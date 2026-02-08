import { useListCatalogsQuery } from '@api/admin/serviceCatalogs.api'
import { useListCategoriesQuery } from '@api/admin/serviceCategories.api'
import { useGetServiceQuery } from '@api/admin/services.api'
import { useListUnitsQuery } from '@api/admin/serviceUnits.api'
import Autocomplete from '@components/Autocomplete'
import FileUpload from '@components/FileUpload'
import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'
import Switch from '@components/Switch'
import TextEditor from '@components/TextEditor'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import type { UpdateServiceRequest, AddServiceRequest } from '@ospk/web-models/services'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const useAddService = () => {
  const [error, analyze] = useAnalyzeRequired<AddServiceRequest>(['label', 'vat', 'price', 'amountType', 'catalogId'])
  const [service, setService] = useState<AddServiceRequest>({
    label: '',
    vat: 15,
    price: 100,
    amountType: 'FINITE',
    forLegals: false,
    disabled: false,
    catalogId: '',
    departments: [],
  })

  return {
    service,
    setService,
    error,
    analyze,
  }
}

const useUpdateService = (id: string) => {
  const getResponse = useGetServiceQuery(id)

  const [error, analyze] = useAnalyzeRequired<UpdateServiceRequest>(['label', 'vat', 'price', 'amountType', 'catalogId'])
  const [service, setService] = useState<UpdateServiceRequest>({})

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setService(getResponse.data)
  }, [getResponse.status])

  return {
    service,
    setService,
    error,
    analyze,
  }
}

const ServicePage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const { service, setService, error, analyze } = !!id ? useUpdateService(id) : useAddService()

  const listCatalogResponse = useListCatalogsQuery({})
  const listCategoryResponse = useListCategoriesQuery({}, { skip: !service.catalogId })
  const listUnitResponse = useListUnitsQuery({}, { skip: service.amountType != 'FINITE' })

  const handlePropChange = (data: any) => {
    setService({
      ...service,
      ...data,
    })
  }

  const handleDelete = () => {}

  const handleSave = () => {
    console.log(service)
    if (!analyze(service)) {
      return
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
          onChange={(value) => handlePropChange({ label: value })}
        />
        <Stack direction={'row'} spacing={1}>
          <TextBox
            fullWidth
            label={'Цена'}
            error={error.price}
            value={service.price}
            onChange={(value) => handlePropChange({ price: value })}
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
                value: 0,
              },
              {
                label: '18%',
                value: 0,
              },
              {
                label: '20%',
                value: 0,
              },
            ]}
            onChange={(value) => handlePropChange({ vat: value })}
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
            onChange={(value) => handlePropChange({ amountType: value })}
          />
          <Autocomplete
            fullWidth
            label={'Единица измерения'}
            loading={listUnitResponse.isLoading}
            disabled={service.amountType != 'FINITE'}
            options={listUnitResponse.data?.map((item) => ({ label: item.label, value: item.id }))}
            value={service.unitId}
            onChange={(value) => handlePropChange({ unitId: value })}
          />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Switch label={'Для юр лиц'} value={service.forLegals} onChange={(value) => handlePropChange({ forLegals: value })} />
          <Switch label={'Включить'} value={!service.disabled} onChange={(value) => handlePropChange({ disabled: !value })} />
        </Stack>
        <Autocomplete
          label={'Каталог'}
          error={error.catalogId}
          loading={listCatalogResponse.isLoading}
          options={listCatalogResponse.data?.map((item) => ({ label: item.label, value: item.id }))}
          value={service.catalogId}
          onChange={(value) => handlePropChange({ catalogId: value })}
        />
        <Autocomplete
          label={'Категория'}
          loading={listCategoryResponse.isLoading}
          disabled={!service.catalogId}
          options={listCategoryResponse.data?.map((item) => ({ label: item.label, value: item.id }))}
          value={service.categoryId}
          onChange={(value) => handlePropChange({ categoryId: value })}
        />
        <Autocomplete
          label={'Отделения'}
          value={service.departments}
          onChange={(value) => handlePropChange({ departments: value })}
        />
        <FileUpload />
      </Stack>
      <Box mt={1} flex={1} gap={1} display={'flex'} flexDirection={'column'}>
        <TextEditor editable content={service.content ?? ''} />
        <Stack direction={'row'} justifyContent={'flex-end'}>
          {!!id && (
            <Button color={'error'} onClick={handleDelete}>
              {service.removedAt == undefined || service.removedAt == null ? 'Удалить' : 'Восстановить'}
            </Button>
          )}
          <Button onClick={() => navigate('../')}>Отмена</Button>
          <Button color={'success'} variant={'outlined'} onClick={handleSave}>
            Сохранить
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default ServicePage
