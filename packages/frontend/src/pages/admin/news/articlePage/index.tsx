import {
  useAddArticleMutation,
  useDeleteArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from '@api/admin/articles/articles.api'
import { useListCatalogsQuery } from '@api/admin/articles/catalogs.api'
import { useListCategoriesQuery } from '@api/admin/articles/categories.api'
import Autocomplete from '@components/Autocomplete'
import FileUpload from '@components/FileUpload'
import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'
import SaveCancelButton from '@components/SaveCancelButton'
import Switch from '@components/Switch'
import TextEditor from '@components/TextEditor'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import type { UpsertArticle } from '@ospk/web-models/articles'
import toAcOptions from '@utils/toAcOptions'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

const ArticlePage = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const [error, analyze] = useAnalyzeRequired<UpsertArticle>(['label', 'catalogId', 'categoryId', 'content'])
  const [article, setArticle, setArticleProp] = useObjectState<UpsertArticle>({
    catalogId: '',
    categoryId: '',
    label: '',
    content: '<p></p>',
    banner: null,
    disabled: false,
    removedAt: null,
  })

  const getResponse = useGetArticleQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  })
  const listCatalogsResponse = useListCatalogsQuery({ activeOnly: true })
  const listCategoriesResponse = useListCategoriesQuery(
    { activeOnly: true, catalogId: article.catalogId },
    {
      skip: !article.catalogId,
      refetchOnMountOrArgChange: true,
    },
  )

  const [addArticle, addResponse] = useAddArticleMutation()
  const [updateArticle, updateResponse] = useUpdateArticleMutation()
  const [deleteArticle, deleteResponse] = useDeleteArticleMutation()

  useEffect(() => {
    if (!getResponse.isSuccess) {
      return
    }

    setArticle(getResponse.data)
  }, [getResponse.status])

  useEffect(() => {
    if (![addResponse.isSuccess, updateResponse.isSuccess, deleteResponse.isSuccess].includes(true)) {
      return
    }

    navigate(-1)
  }, [addResponse.status, updateResponse.status, deleteResponse.status])

  const handleDelete = () => !!id && deleteArticle(id)

  const handleSave = () => {
    const data = {
      ...article,
      label: article.label.trim(),
    }

    if (!analyze(data)) {
      enqueueSnackbar({
        message: 'Ошибка валидации данных',
        variant: 'error',
      })
      console.log(data)
      return
    }

    if (!!id) {
      updateArticle({ id, data })
    } else {
      addArticle(data)
    }
  }

  return (
    <>
      <Stack spacing={2}>
        <PageHeader title={`${!!id ? 'Изменить' : 'Добавить'} новость`} />
        <Stack direction={'row'} spacing={2}>
          <TextBox
            fullWidth
            label={'Название'}
            error={error.label}
            value={article.label}
            onChange={(value) => setArticleProp({ label: value })}
          />
          <Switch label={'Актина'} checked={!article.disabled} onChange={(value) => setArticleProp({ disabled: !value })} />
        </Stack>
        <Autocomplete
          label={'Каталог'}
          error={error.catalogId}
          loading={listCatalogsResponse.isLoading}
          options={toAcOptions(listCatalogsResponse.data)}
          value={article.catalogId}
          onChange={(value) => setArticleProp({ catalogId: value, categoryId: '' })}
        />
        <Autocomplete
          label={'Категория'}
          error={error.categoryId}
          disabled={!article.catalogId}
          loading={listCategoriesResponse.isLoading}
          options={toAcOptions(listCategoriesResponse.data)}
          value={article.categoryId}
          onChange={(value) => setArticleProp({ categoryId: value })}
        />
        <FileUpload label={'Баннер'} subLabel={'изображение'} />
      </Stack>
      <Box sx={{ my: 2, flex: 1, display: 'flex' }}>
        <TextEditor content={article.content} onChange={(value) => setArticleProp({ content: value })} />
      </Box>
      <SaveCancelButton
        showRemoved={!!id}
        removed={!!article.removedAt}
        onDelete={handleDelete}
        onCancel={() => navigate(-1)}
        onSave={handleSave}
      />
    </>
  )
}

export default ArticlePage
