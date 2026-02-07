import { useListCatalogsQuery } from '@api/admin/news.api'
import ActivityChip from '@components/ActivityChip'
import AddButton from '@components/AddButton'
import ListFilter from '@components/ListFilter'
import Table from '@components/Table'
import Box from '@mui/material/Box'

const CatalogPage = () => {
  const response = useListCatalogsQuery({})

  return (
    <Box sx={{ gap: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ListFilter additional={<AddButton title={'Добавить'} />}></ListFilter>
      <Table
        header={[
          {
            name: 'label',
            title: 'Название',
          },
          {
            name: 'disabled',
            title: 'Активна',
          },
        ]}
        data={response.data?.map((item) => ({
          id: item.id,
          label: item.label,
          disabled: <ActivityChip disabled={item.disabled} />,
        }))}
        page={0}
        onPageChange={() => {}}
        isLoading={response.isLoading}
      />
    </Box>
  )
}

export default CatalogPage
