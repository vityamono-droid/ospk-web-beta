import ListFilter from '@components/ListFilter'
import TextBox from '@components/new/TextBox'
import Stack from '@mui/material/Stack'

import type { ListClientDetailsQuery } from '@ospk/web-models/clients'

interface ClientFilterProps {
  content?: React.ReactNode
  filters: ListClientDetailsQuery
  setFilters: ValueCallback<ListClientDetailsQuery>
  setFilterProp: ValueCallback<ListClientDetailsQuery>
}

const ClientFilter = ({ content }: ClientFilterProps) => {
  const handleSubmit = () => {}

  return (
    <ListFilter content={content}>
      <Stack direction={'row'} spacing={2}>
        <TextBox fullWidth label={'Фамилия'} />
        <TextBox fullWidth label={'Телефон'} />
        <TextBox fullWidth label={'Email'} />
      </Stack>
    </ListFilter>
  )
}

export default ClientFilter
