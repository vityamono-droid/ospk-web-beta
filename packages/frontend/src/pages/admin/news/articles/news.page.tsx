import { useListNewsQuery } from '@api/admin/news.api'
import ActivityChip from '@components/ActivityChip'
import AddButton from '@components/AddButton'
import ListFilter from '@components/ListFilter'
import Table from '@components/Table'
import TextBox from '@components/TextBox'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router'

const NewsPage = () => {
  const navigate = useNavigate()
  const response = useListNewsQuery({})

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ListFilter additional={<AddButton title={'Добавить'} onClick={() => navigate('add')} />}>
        <Box sx={{ height: 48, gap: 2, display: 'flex', alignItems: 'center' }}>
          <TextBox size={'small'} label={'Заголовок'} />
          <TextBox size={'small'} type={'date'} label={'Дата публикации'} />
        </Box>
      </ListFilter>
      <Table
        isLoading={response.isLoading}
        header={[
          {
            name: 'label',
            title: 'Заголовок',
          },
          {
            name: 'disabled',
            title: 'Активны',
          },
          {
            name: 'createdAt',
            title: 'Дата публикации',
            align: 'right',
          },
        ]}
        data={response.data?.map((item) => ({
          id: item.id,
          label: item.label,
          disabled: <ActivityChip disabled={item.disabled} />,
          createdAt: item.createdAt,
        }))}
        page={0}
        onPageChange={() => {}}
        onItemClick={(item) => navigate(`${item.id}/edit`)}
      />
    </Box>
  )
}

export default NewsPage
