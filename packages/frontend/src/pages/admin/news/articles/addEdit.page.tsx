import { useGetArticleQuery, useListCatalogsQuery, useListCategoriesQuery } from '@api/admin/news.api'
import Autocomplete from '@components/Autocomplete'
import PageHeader from '@components/PageHeader'
import Switch from '@components/Switch'
import TextBox from '@components/TextBox'
import TextEditor from '@components/TextEditor'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const AddEditPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const categories = useListCategoriesQuery({})
  const catalogs = useListCatalogsQuery({})

  const headerTitle = !!id ? 'Редактировать статью' : 'Добавить статью'
  const response = useGetArticleQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })

  const [article, setArticle] = useState({
    label: '',
    disabled: false,
    content: '',
  })

  useEffect(() => {
    if (!response.isUninitialized && response.isSuccess) {
      setArticle(response.data!)
    }
  }, [response.status])

  const handleChange = (data: Partial<typeof article>) => {
    setArticle({
      ...article,
      ...data,
    })
  }

  return (
    <>
      <PageHeader title={headerTitle} />
      <Box sx={{ gap: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {response.isLoading && (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={64} />
          </Box>
        )}
        {((!response.isLoading && response.isSuccess) || !id) && (
          <>
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <TextBox
                size={'small'}
                label={''}
                fullWidth
                value={article?.label}
                onChange={(value) => handleChange({ label: value })}
              />
              <Switch checked={!article?.disabled} label={'Активна'} onChange={(value) => handleChange({ disabled: !value })} />
            </Box>
            <Autocomplete size={'small'} options={catalogs.data ?? []} label={'Каталог'} />
            <Autocomplete size={'small'} options={categories.data ?? []} label={'Категория'} />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <TextEditor content={article?.content} />
            </Box>
            <Box sx={{ gap: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate('/news')}>{!!id ? 'Отмена' : 'Назад'}</Button>
              <Button variant={'outlined'}>Сохранить</Button>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default AddEditPage
