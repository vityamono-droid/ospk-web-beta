import { useListCatalogsQuery } from '@api/admin/articles/catalogs.api'
import { useListCategoriesQuery } from '@api/admin/articles/categories.api'
import Autocomplete from '@components/Autocomplete'
import ListFilter from '@components/ListFilter'
import TextBox from '@components/new/TextBox'
import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import Grid from '@mui/material/Grid'
import compareObj from '@utils/compareObj'
import toAcOptions from '@utils/toAcOptions'
import { useState, type ReactNode } from 'react'
import type { ArticleCatalogDetails, ArticleCategoryDetails, ListArticlesQuery } from '@ospk/web-models/articles'

interface ArticleFilterProps {
  content?: ReactNode
  filter: Omit<ListArticlesQuery, 'limit'>
  defaultValue: Omit<ListArticlesQuery, 'limit'>
  onFilterChange: (filter: ArticleFilterProps['filter']) => void
}

const ArticleFilter = ({ content, filter, defaultValue, onFilterChange }: ArticleFilterProps) => {
  const [current, setCurrent, setCurrentProp] = useObjectState<ArticleFilterProps['filter']>(filter)
  const [catalogs, setCatalogs] = useState<ArticleCatalogDetails[]>([])
  const [categories, setCategories] = useState<ArticleCategoryDetails[]>([])

  const listCatalogsResponse = useListCatalogsQuery({ activeOnly: true })
  const listCategoriesResponse = useListCategoriesQuery({ activeOnly: true })

  useStatusEffect(() => setCatalogs(listCatalogsResponse.data ?? []), [listCatalogsResponse])
  useStatusEffect(() => setCategories(listCategoriesResponse.data ?? []), [listCategoriesResponse])

  const handleReset = () => {
    setCurrent({ ...defaultValue, offset: 0 })
    onFilterChange({ ...defaultValue, offset: 0 })
  }

  const handleSubmit = () => {
    onFilterChange({ ...current, offset: 0 })
  }

  return (
    <ListFilter showBadge={!compareObj(current, defaultValue)} content={content} onReset={handleReset} onSubmit={handleSubmit}>
      <Grid container spacing={2} size={{ xs: 12, sm: 6, md: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextBox
            fullWidth
            label={'Название'}
            value={current.label ?? ''}
            onChange={(value) => setCurrentProp({ label: value })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            multiple
            label={'Каталоги'}
            options={toAcOptions(catalogs)}
            value={current.catalogs ?? []}
            onChange={(value) => setCurrentProp({ catalogs: value })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            multiple
            label={'Категории'}
            options={toAcOptions(categories)}
            value={current.categories ?? []}
            onChange={(value) => setCurrentProp({ categories: value })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            label={'Активна'}
            options={[
              {
                label: 'Да',
                value: false,
              },
              {
                label: 'Нет',
                value: true,
              },
            ]}
            value={current.disabled ?? false}
            onChange={(value) => setCurrentProp({ disabled: value })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            label={'Удалена'}
            options={[
              {
                label: 'Да',
                value: true,
              },
              {
                label: 'Нет',
                value: false,
              },
            ]}
            value={current.removed ?? false}
            onChange={(value) => setCurrentProp({ removed: value })}
          />
        </Grid>
      </Grid>
    </ListFilter>
  )
}

export default ArticleFilter
