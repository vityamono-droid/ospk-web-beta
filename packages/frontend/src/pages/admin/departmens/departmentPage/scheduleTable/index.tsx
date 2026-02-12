import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import AddIcon from '@mui/icons-material/Add'
import type { ScheduleDetails } from '@ospk/web-models/departments'
import ScheduleItem from './scheduleItem'

interface ScheduleTableProps {
  data: ScheduleDetails[]
  onChange: ValueCallback<ScheduleDetails[]>
}

const ScheduleTable = ({ data, onChange }: ScheduleTableProps) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        label: '',
        weekDays: [],
        timeStart: 9,
        timeEnd: 18,
        removedAt: null,
      },
    ])
  }

  const handleChange = (index: number, item: Partial<ScheduleDetails>) => {
    const newData = data.slice()
    newData.splice(index, 1, {
      ...data[index],
      ...item,
    })
    onChange(newData)
  }

  const handleDelete = (index: number) => {
    const newData = data.slice()
    newData.splice(index, 1, {
      ...data[index],
      removedAt: new Date(),
    })
    onChange(newData)
  }

  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <ScheduleItem
          key={index}
          item={item}
          onChange={(item) => handleChange(index, item)}
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

export default ScheduleTable
