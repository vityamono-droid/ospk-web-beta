import AddButton from '@components/AddButton'
import ListFilter from '@components/ListFilter'
import Table from '@components/Table'
import Box from '@mui/material/Box'
import AddCarousel from './carousel.modal'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TextBox from '@components/TextBox'
import ActivityChip from '@components/ActivityChip'

const TableActions = ({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => void }) => {
  return (
    <>
      <IconButton size={'small'} onClick={() => onEdit()}>
        <EditIcon />
      </IconButton>
      <IconButton size={'small'} onClick={() => onDelete()}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}

const IndexPage = () => {
  const response = {
    data: [
      {
        id: 1,
        label: 'Тест карусель 1',
        link: 'http://google.com/1',
        durationFrom: new Date(),
        durationTo: new Date(),
        disabled: false,
      },
      {
        id: 2,
        label: 'Главная карусель',
        link: 'http://google.com/2',
        durationFrom: new Date(),
        durationTo: new Date(),
        disabled: true,
      },
      {
        id: 3,
        label: 'Карусель в новостях',
        link: 'http://google.com/3',
        durationFrom: new Date(),
        durationTo: new Date(),
        disabled: true,
      },
    ],
    isLoading: false,
    isError: false,
  }

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<(typeof response.data)[number]>()

  const handleOpen = (id?: number) => {
    setSelected(response.data.find((item) => item.id == id))
    setOpen((state) => !state)
  }

  return (
    <>
      <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        <ListFilter additional={<AddButton title={'Добавить'} onClick={() => handleOpen()} />}>
          <>
            <Box sx={{ gap: 2, display: 'flex' }}>
              <TextBox size={'small'} label={'Название'} />
              <TextBox type={'date'} size={'small'} label={'Начало'} />
              <TextBox type={'date'} size={'small'} label={'Конец'} />
            </Box>
          </>
        </ListFilter>
        <Table
          header={[
            {
              name: 'label',
              title: 'Заголовок',
            },
            {
              name: 'disabled',
              title: 'Активна',
            },
            {
              name: 'period',
              title: 'Период',
            },
            {
              name: 'actions',
              title: 'Действия',
              align: 'right',
            },
          ]}
          data={response.data.map((item) => ({
            id: item.id,
            label: item.label,
            disabled: <ActivityChip disabled={item.disabled} />,
            period: `${item.durationFrom.toLocaleDateString()} - ${item.durationFrom.toLocaleDateString()}`,
            actions: <TableActions onEdit={() => handleOpen(item.id)} onDelete={() => {}} />,
          }))}
          page={0}
          onPageChange={() => {}}
        />
        <AddCarousel carousel={selected} open={open} onClose={() => setOpen((state) => !state)} />
      </Box>
    </>
  )
}

export default IndexPage
