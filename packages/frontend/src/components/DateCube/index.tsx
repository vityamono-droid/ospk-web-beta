import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const monthMapping = (month: number) => {
  return ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'][month - 1]
}

const DateCube = ({ date }: { date: Date }) => {
  date = new Date(date)
  return (
    <Stack
      p={0.5}
      height={56}
      bgcolor={'#e0e0ee'}
      borderRadius={0.5}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ aspectRatio: 1 }}>
      <Typography>{date.getDate()}</Typography>
      <Typography noWrap fontSize={11}>
        {monthMapping(date.getMonth())} {date.getFullYear()}
      </Typography>
    </Stack>
  )
}

export default DateCube
