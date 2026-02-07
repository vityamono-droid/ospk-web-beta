import ListFilter from '@components/ListFilter'
import TextBox from '@components/new/TextBox'
import Box from '@mui/material/Box'
import type { JSX } from 'react'

interface ClientsFilterProps {
  additional?: JSX.Element
}

const ClientsFilter = ({ additional }: ClientsFilterProps) => {
  return (
    <ListFilter additional={additional}>
      <Box sx={{ gap: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <TextBox label={'ФИО'} />
        <TextBox label={'Телефон'} />
        <TextBox label={'Email'} />
      </Box>
    </ListFilter>
  )
}

export default ClientsFilter
