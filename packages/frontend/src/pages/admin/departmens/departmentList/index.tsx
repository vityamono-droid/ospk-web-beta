import { useEffect, useState } from 'react'
import DepartmentTable from './departments.table'
import type { DepartmentDetails } from '@ospk/web-models/departments'
import { useListDepartmentsQuery } from '@api/admin/departments.api'
import Stack from '@mui/material/Stack'
import AddButton from '@components/AddButton'
import { useNavigate } from 'react-router'

const DepartmentListPage = () => {
  const navigate = useNavigate()
  const listResponse = useListDepartmentsQuery({})

  const [departments, setDepartments] = useState<DepartmentDetails[]>([])

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setDepartments(listResponse.data)
  }, [listResponse.status])

  return (
    <>
      <Stack spacing={2}>
        <Stack direction={'row'}>
          <AddButton onClick={() => navigate('add')} />
        </Stack>
        <DepartmentTable data={departments} />
      </Stack>
    </>
  )
}

export default DepartmentListPage
