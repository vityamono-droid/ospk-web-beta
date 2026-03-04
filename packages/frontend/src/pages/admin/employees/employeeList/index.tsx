import AddButton from '@components/AddButton'
import RefreshButton from '@components/RefreshButton'
import Stack from '@mui/material/Stack'
import EmployeeTable from './employees.table'
import { useState } from 'react'
import EmployeeModal from './employee.model'
import type { EmployeeDetails } from '@ospk/web-models/employees'
import { useListEmployeesQuery } from '@api/admin/departments/employees.api'
import useStatusEffect from '@hooks/useStatusEffect'

const EmployeeListPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<string>()
  const [employees, setEmployees] = useState<EmployeeDetails[]>([])

  const listResponse = useListEmployeesQuery({}, {
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setEmployees(listResponse.data ?? []), [listResponse])

  const handleOpenModal = (id?: string) => {
    setSelected(id)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelected(undefined)
  }

  return (
    <>
      <Stack direction={'row'}>
        <RefreshButton onClick={() => listResponse.refetch()} />
        <AddButton onClick={handleOpenModal} />
      </Stack>
      <EmployeeTable data={employees} onRowClick={handleOpenModal} />
      {openModal && <EmployeeModal id={selected} open={openModal} onClose={handleCloseModal} />}
    </>
  )
}

export default EmployeeListPage
