import { useListCategoriesQuery } from '@api/admin/news.api'
import AddButton from '@components/AddButton'
import ListFilter from '@components/ListFilter'
import TreeView from '@components/TreeView'
import Box from '@mui/material/Box'

const CategoryPage = () => {
  const response = useListCategoriesQuery({})

  return (
    <Box sx={{ gap: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ListFilter additional={<AddButton title={'Добавить'} />}></ListFilter>
      <TreeView data={response.data ?? []} />
    </Box>
  )
}

export default CategoryPage
