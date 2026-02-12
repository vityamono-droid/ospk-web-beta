import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'
import SaveCancelButton from '@components/SaveCancelButton'
import Switch from '@components/Switch'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ScheduleTable from './scheduleTable'
import ContactTable from './contactTable'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import type { UpsertDepartmentDetails } from '@ospk/web-models/departments'
import { useAddDepartmentMutation, useDeleteDepartmentMutation, useGetDepartmentQuery, useUpdateDepartmentMutation } from '@api/admin/departments.api'
import MPhoneBox from '@components/MPhoneBox'

const DepartmentPage = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const getRequest = useGetDepartmentQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })
  const [addDepartment, addResponse] = useAddDepartmentMutation()
  const [updateDepartment, updateResponse] = useUpdateDepartmentMutation()
  const [deleteDepartment, deleteResponse] = useDeleteDepartmentMutation()

  const [error, analyze] = useAnalyzeRequired(['address'])
  const [department, setDepartment, setDepartmentProp] = useObjectState<UpsertDepartmentDetails>({
    address: '',
    phone: '',
    email: '',
    disabled: false,
    removedAt: null,
    schedules: [],
    contacts: [],
  })

  useEffect(() => {
    if (!getRequest.isSuccess) {
      return
    }

    setDepartment(getRequest.data)
  }, [getRequest.status])

  useEffect(() => {
    if (![addResponse.isSuccess, updateResponse.isSuccess, deleteResponse.isSuccess].includes(true)) {
      return
    }

    if (addResponse.isSuccess) {
      navigate(`/admin/departments/${addResponse.data}`)
      return
    }

    getRequest.refetch()
  }, [addResponse.status, updateResponse.status, deleteResponse.status])

  const handleDelete = () => !!id && deleteDepartment(id)

  const handleSave = () => {
    const data = {
      ...department,
      address: department.address,
      phone: department.phone || null,
      email: department.email || null,
    }

    console.log(data)
    if (!analyze(data)) {
      return
    }

    if (!!id) {
      updateDepartment({ id, data })
    } else {
      addDepartment(data)
    }
  }

  return (
    <>
      <Stack spacing={2} sx={{ flex: 1 }}>
        <PageHeader title={`${!!id ? 'Изменить' : 'Добавить'} отделение`} />
        {/* Common */}
        <Typography fontWeight={'bold'}>• Основное</Typography>
        <TextBox
          label={'Адрес'}
          error={error.address}
          value={department.address}
          maxLength={128}
          onChange={(value) => setDepartmentProp({ address: value })}
        />
        <Stack direction={'row'} spacing={1}>
          <TextBox
            fullWidth
            label={'Телефон'}
            value={department.phone}
            slotProps={{
              input: {
                inputComponent: MPhoneBox,
              },
            }}
            onChange={(value) => setDepartmentProp({ phone: value })}
          />
          <TextBox
            fullWidth
            label={'Email'}
            maxLength={128}
            value={department.email}
            onChange={(value) => setDepartmentProp({ email: value })}
          />
          <Switch
            label={'Активно'}
            checked={!department.disabled}
            onChange={(value) => setDepartmentProp({ disabled: !value })}
          />
        </Stack>
        {/* Schedule */}
        <Typography fontWeight={'bold'}>• Расписание</Typography>
        <ScheduleTable data={department.schedules} onChange={(value) => setDepartmentProp({ schedules: value })} />
        {/* Contacts */}
        <Typography fontWeight={'bold'}>• Контакты</Typography>
        <ContactTable data={department.contacts} onChange={(value) => setDepartmentProp({ contacts: value })} />
      </Stack>
      <SaveCancelButton
        showRemoved={!!id}
        removed={!!department.removedAt}
        onDelete={handleDelete}
        onCancel={() => navigate('/admin/departments')}
        onSave={handleSave}
      />
    </>
  )
}

export default DepartmentPage
