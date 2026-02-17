import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ContactItem from './contactItem'

import AddIcon from '@mui/icons-material/Add'
import type { ContactDetails } from '@ospk/web-models/departments'

interface ContactTableProps {
  data: ContactDetails[]
  onChange?: ValueCallback<ContactDetails[]>
}

const ContactTable = ({ data, onChange }: ContactTableProps) => {
  const handleChange = (item: Partial<ContactDetails>, index: number) => {
    const newData = data.slice()
    newData.splice(index, 1, {
      ...data[index],
      ...item,
    })
    !!onChange && onChange(newData)
  }

  const handleDelete = (index: number) => {
    const newData = data.slice()
    newData.splice(index, 1, {
      ...data[index],
      removedAt: new Date(),
    })
    !!onChange && onChange(newData)
  }

  const handleAdd = () => {
    !!onChange &&
      onChange([
        ...data,
        {
          phone: '',
          type: 'PHONE',
          employeeId: '',
          disabled: false,
          removedAt: null,
        },
      ])
  }

  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <ContactItem
          key={item.id ?? index}
          item={item}
          onChange={(item) => handleChange(item, index)}
          onDelete={() => handleDelete(index)}
        />
      ))}
      <Grid
        size={{ xs: 12, md: 6, lg: 4 }}
        minHeight={170}
        component={Button}
        startIcon={<AddIcon />}
        variant={'outlined'}
        onClick={handleAdd}
      />
    </Grid>
  )
}

export default ContactTable
