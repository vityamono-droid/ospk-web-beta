import Autocomplete from '@components/Autocomplete'
import DeleteRestoreButton from '@components/DeleteRestoreButton'
import TextBox from '@components/new/TextBox'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import type { ScheduleDetails, WeekDay } from '@ospk/web-models/departments'

interface ScheduleItemProps {
  item: ScheduleDetails
  onChange?: ValueCallback<Partial<ScheduleDetails>>
  onDelete?: Callback
}

const ScheduleItem = ({ item, onChange, onDelete }: ScheduleItemProps) => {
  const handleChange = (item: Partial<ScheduleDetails>) => !!onChange && onChange(item)

  const handleWeekDays = (value: WeekDay) => {
    if (item.weekDays.includes(value)) {
      handleChange({ weekDays: item.weekDays.filter((item) => item != value) })
    } else {
      handleChange({ weekDays: [...item.weekDays, value] })
    }
  }

  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Paper variant={'outlined'}>
        <Stack p={2} spacing={1.5}>
          <Stack direction={'row'}>
            <TextBox
              fullWidth
              label={'Название *'}
              value={item.label}
              onChange={(value) => handleChange({ label: value })}
              slotProps={{
                input: {
                  sx: {
                    borderStartEndRadius: 0,
                    borderEndEndRadius: 0,
                  },
                },
              }}
            />
            <DeleteRestoreButton removed={!!item.removedAt} onClick={onDelete} />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Autocomplete
              fullWidth
              label={'С'}
              options={timeSlotOptions}
              value={item.timeStart}
              onChange={(value) => handleChange({ timeStart: value as any })}
            />
            <Autocomplete
              fullWidth
              label={'До'}
              options={timeSlotOptions}
              value={item.timeEnd}
              onChange={(value) => handleChange({ timeEnd: value as any })}
            />
          </Stack>
          <ButtonGroup>
            {weekDayOptions.map((day) => (
              <Button
                fullWidth
                disableElevation
                key={day.value}
                variant={item.weekDays.includes(day.value) ? 'contained'  : 'outlined'}
                color={item.weekDays.includes(day.value) ? 'primary' : 'black'}
                onClick={() => handleWeekDays(day.value)}>
                {day.label}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>
      </Paper>
    </Grid>
  )
}

const timeSlotOptions = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((item) => ({
  label: `${`${item}`.padStart(2, '0')}:00`,
  value: item,
}))

const weekDayOptions = [
  {
    label: 'пн',
    value: 'MONDAY',
  },
  {
    label: 'вт',
    value: 'TUESDAY',
  },
  {
    label: 'ср',
    value: 'WEDNESDAY',
  },
  {
    label: 'Чт',
    value: 'THURSDAY',
  },
  {
    label: 'Пт',
    value: 'FRIDAY',
  },
  {
    label: 'Сб',
    value: 'SATURDAY',
  },
  {
    label: 'Вс',
    value: 'SUNDAY',
  },
] as { label: string; value: WeekDay }[]

export default ScheduleItem
