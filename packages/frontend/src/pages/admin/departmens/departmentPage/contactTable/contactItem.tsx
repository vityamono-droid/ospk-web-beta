import { useListEmployeesQuery } from '@api/admin/departments/employees.api'
import Autocomplete from '@components/Autocomplete'
import DeleteRestoreButton from '@components/DeleteRestoreButton'
import MPhoneBox from '@components/MPhoneBox'
import TextBox from '@components/new/TextBox'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'

import type { ContactDetails } from '@ospk/web-models/departments'

const typeOptions = [
  {
    label: 'Телефон',
    value: 'PHONE',
  },
  {
    label: 'Факс',
    value: 'FAX',
  },
]

interface ContactItemProps {
  item: ContactDetails
  onChange?: ValueCallback<Partial<ContactDetails>>
  onDelete?: Callback
}

const ContactItem = ({ item, onChange, onDelete }: ContactItemProps) => {
  const listEmployeesResponse = useListEmployeesQuery({})

  const handleChange = (item: Partial<ContactDetails>) => {
    !!onChange && onChange(item)
  }

  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Paper variant={'outlined'}>
        <Stack p={2} spacing={1.5}>
          <Stack direction={'row'}>
            <TextBox
              fullWidth
              label={'Телефон *'}
              value={item.phone}
              onChange={(value) => handleChange({ phone: value })}
              slotProps={{
                input: {
                  inputComponent: MPhoneBox,
                  sx: {
                    borderStartEndRadius: 0,
                    borderEndEndRadius: 0,
                  },
                },
              }}
            />
            <DeleteRestoreButton removed={!!item.removedAt} onClick={onDelete} />
          </Stack>
          <Autocomplete
            label={'Сотрудник *'}
            options={listEmployeesResponse.data?.map((item) => ({
              label: `${item.lastName} ${item.firstName} ${item.patronymic}`,
              value: item.id,
            }))}
            value={item.employeeId}
            onChange={(value) => handleChange({ employeeId: value as any })}
          />
          <Stack position={'relative'} direction={'row'} spacing={1}>
            <Autocomplete
              fullWidth
              label={'Тип *'}
              options={typeOptions}
              value={item.type}
              onChange={(value) => handleChange({ type: value as any })}
            />
            <Switch checked={!item.disabled} onChange={(_, value) => handleChange({ disabled: !value })} />
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  )
}

export default ContactItem
