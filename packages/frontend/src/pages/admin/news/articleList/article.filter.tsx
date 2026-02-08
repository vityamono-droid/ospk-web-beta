import Autocomplete from '@components/Autocomplete'
import ListFilter from '@components/ListFilter'
import TextBox from '@components/new/TextBox'
import useObjectState from '@hooks/useObjectState'
import Grid from '@mui/material/Grid'
import type { ListArticlesQuery } from '@ospk/web-models/articles'
import compareObj from '@utils/compareObj'
import type { ReactNode } from 'react'

interface ArticleFilterProps {
  additional?: ReactNode
  filter: Omit<ListArticlesQuery, 'limit'>
  defaultValue: Omit<ListArticlesQuery, 'limit'>
  onFilterChange: (filter: ArticleFilterProps['filter']) => void
}

const ArticleFilter = ({ additional, filter, defaultValue, onFilterChange }: ArticleFilterProps) => {
  const [current, setCurrent, setCurrentProp] = useObjectState<ArticleFilterProps['filter']>(filter)

  const handleReset = () => {
    setCurrent({ ...defaultValue, offset: 0 })
    onFilterChange({ ...defaultValue, offset: 0 })
  }

  const handleSubmit = () => {
    onFilterChange({ ...current, offset: 0 })
  }

  return (
    <ListFilter
      changed={!compareObj(current, defaultValue)}
      additional={additional}
      onReset={handleReset}
      onSubmit={handleSubmit}>
      <Grid container spacing={2} size={{ xs: 12, sm: 6, md: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <TextBox fullWidth label={'Название'} value={current.label ?? ''} onChange={(value) => setCurrentProp({ label: value })} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete label={'Каталоги'} value={current.catalogs ?? []} onChange={(value) => setCurrentProp({ catalogs: value })} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Autocomplete
            label={'Категории'}
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
