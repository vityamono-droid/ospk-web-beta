import {
  useAddArticleMutation,
  useDeleteArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from '@api/admin/articles/articles.api'
import { useListCatalogsQuery } from '@api/admin/articles/catalogs.api'
import { useListCategoriesQuery } from '@api/admin/articles/categories.api'
import Autocomplete from '@components/Autocomplete'
import BannerUpload from '@components/BannerUpload'
import TextBox from '@components/new/TextBox'
import PageHeader from '@components/PageHeader'
import SaveCancelButton from '@components/SaveCancelButton'
import Switch from '@components/Switch'
import TextEditor from '@components/TextEditor'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import useTextEditor from '@hooks/useTextEditor'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import type { UpsertArticleDetails } from '@ospk/web-models/articles'
import toAcOptions from '@utils/toAcOptions'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const ArticlePage = () => {
  const navigate = useNavigate()

  const { id } = useParams()
  const { ref, api } = useTextEditor()

  const [banner, setBanner] = useState<File | null>(null)
  const [error, analyze] = useAnalyzeRequired<UpsertArticleDetails>(['label', 'catalogId', 'categoryId', 'content'])
  const [article, setArticle, setArticleProp] = useObjectState<UpsertArticleDetails>({
    catalogId: '',
    categoryId: '',
    label: '',
    content: '',
    banner: null,
    description: null,
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

  useStatusEffect(() => setArticle(getResponse.data), [getResponse])
  useStatusEffect(() => navigate(-1), [addResponse, updateResponse, deleteResponse])

  const handleDelete = () => !!id && deleteArticle(id)

  const handleSave = () => {
    const data = {
      ...article,
      label: article.label.trim(),
      content: !api.getText()?.trim() ? '' : (api.getHTML() ?? ''),
    }

    if (!analyze(data)) {
      return
    }

    const formData = new FormData()
    !!banner && formData.append('banner', banner)
    formData.append('data', JSON.stringify(data))

    if (!!id) {
      updateArticle({ id, data: formData })
    } else {
      addArticle(formData)
    }
  }

  return (
    <>
      <Stack spacing={2}>
        <PageHeader title={`${!!id ? 'Изменить' : 'Добавить'} новость`} />
        <Stack spacing={2} direction={{ xs: 'column', lg: 'row' }} width={'100%'}>
          <BannerUpload
            file={article.banner}
            onChange={(value) => setBanner(value)}
            onPreview={(value) => setArticleProp({ banner: value })}
          />
          <Stack spacing={2} width={'100%'}>
            <Stack direction={'row'} spacing={2}>
              <TextBox
                fullWidth
                label={'Название'}
                error={error.label}
                value={article.label}
                maxLength={64}
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
            <TextBox
              fullWidth
              label={'Описание'}
              value={article.description ?? ''}
              maxLength={128}
              onChange={(value) => setArticleProp({ description: value || null })}
            />
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ my: 2, flex: 1, display: 'flex' }}>
        <TextEditor ref={ref} content={article.content} />
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
