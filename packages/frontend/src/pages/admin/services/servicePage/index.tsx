import Autocomplete from '@components/Autocomplete'
import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'
import Switch from '@components/Switch'
import TextEditor from '@components/TextEditor'
import Box from '@mui/material/Box'
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
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { type UpsertServiceDetails } from '@ospk/web-models/services'
import useObjectState from '@hooks/useObjectState'
import SaveCancelButton from '@components/SaveCancelButton'
import BannerUpload from '@components/BannerUpload'
import useStatusEffect from '@hooks/useStatusEffect'
import useTextEditor from '@hooks/useTextEditor'
import toAcOptions from '@utils/toAcOptions'
import MNumberBox from '@components/MNumberBox'
import { enqueueSnackbar } from 'notistack'
//import { useListDepartmentsQuery } from '@api/admin/departments.api'

const ServicePage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const { ref, api } = useTextEditor()
  const getResponse = useGetServiceQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const [addService, addResponse] = useAddServiceMutation()
  const [updateService, updateResponse] = useUpdateServiceMutation()
  const [deleteService, deleteResponse] = useDeleteServiceMutation()

  const [banner, setBanner] = useState<File | null>()
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
  //const listDepartmentsResponse = useListDepartmentsQuery({})

  useStatusEffect(() => setService(getResponse.data), [getResponse])
  useStatusEffect(() => {
    if (addResponse.isSuccess) {
      navigate(addResponse.data)
      return
    }

    if (updateResponse.isSuccess) {
      getResponse.refetch()
      return
    }

    navigate(-1)
  }, [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteService(id)

  const handleSave = () => {
    const data = {
      ...service,
      label: service.label.trim(),
      content: !!api.getText() ? (api.getHTML() ?? null) : null,
      catalogId: service.catalogId.trim(),
      categoryId: service.categoryId?.trim() ?? null,
    }

    console.log(data)
    if (!analyze(service)) {
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
      updateService({ id: id, data: formData })
    } else {
      addService(formData)
    }
  }

  return (
    <>
      <Stack spacing={2}>
        <PageHeader title={`${!!id ? 'Изменение' : 'Добавление'} услуги`} backTo={'../'} />
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1}>
          <BannerUpload
            file={service.banner}
            onChange={(value) => setBanner(value)}
            onPreview={(value) => setServiceProp({ banner: value })}
          />
          <Stack spacing={2} width={'100%'}>
            <TextBox
              fullWidth
              label={'Название *'}
              error={error.label}
              value={service.label}
              onChange={(value) => setServiceProp({ label: value })}
            />
            <Stack direction={'row'} spacing={1}>
              <TextBox
                fullWidth
                label={'Цена *'}
                error={error.price}
                value={`${service.price}`}
                slotProps={{
                  input: {
                    inputComponent: MNumberBox,
                  },
                }}
                onChange={(value) => setServiceProp({ price: !!value ? +value : null })}
              />
              <Autocomplete
                fullWidth
                label={'НДС *'}
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
                label={'Исчисляемое *'}
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
              <Switch
                label={'Для юр лиц'}
                checked={service.forLegals}
                onChange={(value) => setServiceProp({ forLegals: value })}
              />
              <Switch
                label={'Активна'}
                checked={!service.disabled}
                onChange={(value) => setServiceProp({ disabled: !value })}
              />
            </Stack>
          </Stack>
        </Stack>
        <Autocomplete
          fullWidth
          label={'Каталог *'}
          error={error.catalogId}
          loading={listCatalogResponse.isLoading}
          options={toAcOptions(listCatalogResponse.data)}
          value={service.catalogId}
          onChange={(value) => setServiceProp({ catalogId: value, categoryId: null })}
        />
        <Autocomplete
          fullWidth
          label={'Категория'}
          loading={listCategoryResponse.isLoading}
          disabled={!service.catalogId}
          options={toAcOptions(listCategoryResponse.data)}
          value={service.categoryId}
          onChange={(value) => setServiceProp({ categoryId: value })}
        />
        {/* <Autocomplete
          fullWidth
          multiple
          label={'Отделения'}
          options={listDepartmentsResponse.data?.map((item) => ({ label: item.address, value: item.id })) ?? []}
          value={service.departments.map((item) => item.departmentId)}
          onChange={(value) => setServiceProp({ departments: value ?? [] })}
        /> */}
      </Stack>
      <Box mt={2} flex={1} gap={1} display={'flex'} flexDirection={'column'}>
        <TextEditor editable ref={ref} content={service.content ?? ''} />
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
