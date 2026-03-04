import { useListDepartmentsQuery } from '@api/admin/departments/departments.api'
import {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from '@api/admin/departments/employees.api'
import Autocomplete from '@components/Autocomplete'
import BannerUpload from '@components/BannerUpload'
import Modal from '@components/Modal'
import TextBox from '@components/new/TextBox'
import SaveCancelButton from '@components/SaveCancelButton'
import Switch from '@components/Switch'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import Stack from '@mui/material/Stack'
import type { UpsertEmployeeDetails } from '@ospk/web-models/employees'
import { useState } from 'react'

interface EmployeeModalProps {
  id?: string
  open?: boolean
  onClose?: Callback
}

const EmployeeModal = ({ id, open, onClose }: EmployeeModalProps) => {
  const getResponse = useGetEmployeeQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const listDepartmentsResponse = useListDepartmentsQuery({})

  const [addEmployee, addResponse] = useAddEmployeeMutation()
  const [updateEmployee, updateResponse] = useUpdateEmployeeMutation()
  const [deleteEmployee, deleteResponse] = useDeleteEmployeeMutation()

  const [photo, setPhoto] = useState<File | null>()
  const [error, analyze] = useAnalyzeRequired<UpsertEmployeeDetails>(['firstName', 'lastName', 'level', 'departmentId'])
  const [employee, setEmployee, setEmployeeProp] = useObjectState<UpsertEmployeeDetails>({
    firstName: '',
    lastName: '',
    patronymic: null,
    photo: null,
    level: 'PRIMARY',
    departmentId: '',
    disabled: false,
    removedAt: null,
  })

  useStatusEffect(() => setEmployee(getResponse.data), [getResponse])
  useStatusEffect(() => !!onClose && onClose(), [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteEmployee(id)

  const handleSave = () => {
    const data = {
      ...employee,
      lastName: employee.lastName.trim(),
      firstName: employee.firstName.trim(),
    }

    if (!analyze(data)) {
      return
    }

    const formData = new FormData()
    !!photo && formData.append('photo', photo)
    formData.append('data', JSON.stringify(data))

    if (!!id) {
      updateEmployee({ id, data: formData })
    } else {
      addEmployee(formData)
    }
  }

  return (
    <Modal title={`${!!id ? 'Изменить' : 'Добавить'} сотрудника`} open={open} onClose={onClose}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <BannerUpload
            file={employee.photo}
            onChange={(value) => setPhoto(value)}
            onPreview={(value) => setEmployeeProp({ photo: value })}
          />
          <Stack width={{ xs: 'reset', md: 300 }} spacing={2}>
            <TextBox
              label={'Фамилия'}
              error={error.lastName}
              value={employee.lastName ?? ''}
              maxLength={32}
              onChange={(value) => setEmployeeProp({ lastName: value })}
            />
            <TextBox
              label={'Имя'}
              error={error.firstName}
              value={employee.firstName ?? ''}
              maxLength={32}
              onChange={(value) => setEmployeeProp({ firstName: value })}
            />
            <TextBox
              label={'Отчество'}
              value={employee.patronymic ?? ''}
              maxLength={32}
              onChange={(value) => setEmployeeProp({ patronymic: value || null })}
            />
            <Autocomplete
              label={'Образование'}
              error={error.level}
              options={[
                {
                  label: 'Высшее',
                  value: 'HIGHER',
                },
                {
                  label: 'Среднее',
                  value: 'SECONDARY',
                },
                {
                  label: 'Начальное',
                  value: 'PRIMARY',
                },
              ]}
              value={employee.level}
              onChange={(value) => setEmployeeProp({ level: value })}
            />
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Autocomplete
            fullWidth
            label={'Отдел'}
            error={error.departmentId}
            loading={listDepartmentsResponse.isLoading}
            options={
              listDepartmentsResponse.data?.map((item) => ({
                label: item.address,
                value: item.id,
              })) ?? []
            }
            value={employee.departmentId}
            onChange={(value) => setEmployeeProp({ departmentId: value })}
          />
          <Switch label={'Активен'} checked={!employee.disabled} onChange={(value) => setEmployeeProp({ disabled: !value })} />
        </Stack>
        <SaveCancelButton
          showRemoved={!!id}
          removed={!!employee.removedAt}
          onDelete={handleDelete}
          onCancel={onClose}
          onSave={handleSave}
        />
      </Stack>
    </Modal>
  )
}

export default EmployeeModal
