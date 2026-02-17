import { useListDepartmentsQuery } from '@api/client/departments.api'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { DepartmentData, WeekDay } from '@ospk/web-models/departments'
import { useEffect, useState } from 'react'
import LocationIcon from '@mui/icons-material/LocationPin'
import Grid from '@mui/material/Grid'
import formatPhone from '@utils/formatPhone'
import Divider from '@mui/material/Divider'

const weekDayMapping: { [key in WeekDay]: string } = {
  MONDAY: 'ПН',
  TUESDAY: 'ВТ',
  WEDNESDAY: 'СР',
  THURSDAY: 'ЧТ',
  FRIDAY: 'ПТ',
  SATURDAY: 'СБ',
  SUNDAY: 'ВС',
  CUSTOM: '',
}

const ContactsRouter = () => {
  const listResponse = useListDepartmentsQuery({})
  const [departments, setDepartments] = useState<DepartmentData[]>([])
  const [selected, setSelected] = useState<DepartmentData>()

  useEffect(() => {
    if (!listResponse.isSuccess) {
      return
    }

    setDepartments(listResponse.data)
    setSelected(listResponse.data[0])
  }, [listResponse.status])

  return (
    <Stack direction={'row'} flex={1} width={'100%'} spacing={2}>
      <Stack width={'100%'}>
        <Paper sx={{ flex: 1 }}>
          <Stack p={2}>
            {selected && (
              <Stack spacing={2}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <LocationIcon />
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    {selected.address}
                  </Typography>
                </Stack>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <a
                    href={'https://yandex.ru/maps?utm_medium=mapframe&utm_source=maps'}
                    style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 0 }}>
                    Яндекс Карты
                  </a>
                  <a
                    href={'https://yandex.ru/maps/?ll=60.395641%2C54.446199&utm_medium=mapframe&utm_source=maps&z=8'} // geo from db
                    style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 14 }}>
                    Яндекс Карты — транспорт, навигация, поиск мест
                  </a>
                  <iframe
                    src={selected.maps}
                    width={'100%'}
                    height={360}
                    allowFullScreen={true}
                    style={{ position: 'relative' }}></iframe>
                </div>
                {/* Schedules */}
                <Stack spacing={2}>
                  <Grid container rowSpacing={1}>
                    <Grid size={6}>
                      {(!!selected.phone || !!selected.email) && (
                        <Typography variant={'h6'} fontWeight={'bold'}>
                          Основные контакты
                        </Typography>
                      )}
                    </Grid>
                    <Grid size={6}>
                      <Typography variant={'h6'} fontWeight={'bold'}>
                        График работы
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Stack spacing={1}>
                        {selected.phone && (
                          <Typography fontWeight={'bold'}>
                            Регистратура: <Typography fontWeight={'normal'}>{formatPhone(selected.phone)}</Typography>
                          </Typography>
                        )}
                        {selected.email && (
                          <Typography fontWeight={'bold'}>
                            Эд. почта: <Typography fontWeight={'normal'}>{selected.email}</Typography>
                          </Typography>
                        )}
                      </Stack>
                    </Grid>
                    <Grid size={6}>
                      {selected.schedules
                        .slice()
                        .reverse()
                        .map((item) => (
                          <Stack spacing={1}>
                            <Typography fontWeight={'bold'}>{item.label}</Typography>
                            <Grid container>
                              <Grid size={6}>
                                <Typography>{item.weekDays.map((item) => weekDayMapping[item]).join(', ')}</Typography>
                              </Grid>
                              <Grid size={6}>
                                с {item.timeStart} до {item.timeEnd}
                              </Grid>
                            </Grid>
                          </Stack>
                        ))}
                    </Grid>
                  </Grid>
                </Stack>
                {/* Static */}
                <Stack>
                  <Typography textAlign={'center'}>
                    В связи с вступлением в силу Федерального закона от 28.12.2024 № 547-ФЗ «О внесении изменений в Федеральный
                    закон «О порядке рассмотрения обращений граждан Российской Федерации» информируем, что с 30 марта 2025 года
                    <Typography fontWeight={'bold'}>
                      приём обращений граждан по электронной почте не осуществляется. Направить обращение можно через Портал
                      государственных услуг Российской Федерации.
                    </Typography>
                  </Typography>
                </Stack>
                {/* Contacts */}
                <Grid container textAlign={'center'}>
                  {selected.contacts.map((item) => (
                    <>
                      <Grid size={4} p={2}>
                        {item.employee.position}
                      </Grid>
                      <Grid size={4} p={2}>
                        {item.employee.lastName} {item.employee.firstName} {item.employee.patronymic}
                      </Grid>
                      <Grid size={4} p={2}>
                        <Typography>
                          {item.type === 'FAX' ? 'факс' : 'тел.'} {formatPhone(item.phone)}
                        </Typography>
                      </Grid>
                      <Grid size={12}>
                        <Divider />
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
      <Stack width={'40%'}>
        <Paper>
          <Stack p={2}>
            {departments.map((item) => (
              <MenuItem key={item.address} selected={selected?.address == item.address} onClick={() => setSelected(item)}>
                <ListItemText>{item.address}</ListItemText>
              </MenuItem>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  )
}

export default ContactsRouter
