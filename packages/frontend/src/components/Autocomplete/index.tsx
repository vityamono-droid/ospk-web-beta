import MuiAutocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { JSX } from 'react'

interface AutocompleteItem<TValue = any> {
  label: string
  value: TValue
}

interface AutocompleteProps<TValue, TMultiple extends boolean | undefined = false> {
  label?: string
  error?: boolean
  loading?: boolean
  multiple?: TMultiple
  disabled?: boolean
  options?: AutocompleteItem<TValue>[]
  value?: (TMultiple extends false ? TValue : TValue[]) | null
  fullWidth?: boolean
  onChange?: (value?: (TMultiple extends false ? TValue : TValue[]) | null) => void
}

const Autocomplete: <TValue, TMultiple extends boolean | undefined = false>(
  props: AutocompleteProps<TValue, TMultiple>,
) => JSX.Element = (props) => {
  const { label, error, loading, multiple = false, disabled, options = [], value, fullWidth, onChange } = props

  const handleOptions = () => {
    if (!value) {
      return null
    }

    if (Array.isArray(value)) {
      return options.find((item) => value.includes(item.value)) ?? null
    }

    return options.find((item) => item.value == value) ?? null
  }

  const handleChange = (value: any) => {
    if (!onChange) {
      return
    }

    if (!value) {
      onChange(null)
      return
    }

    if (Array.isArray(value)) {
      onChange(value.map((item) => item.value) as any)
      return
    }

    onChange(value.value)
  }

  return (
    <MuiAutocomplete
      size={'small'}
      multiple={multiple}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled}
      options={options}
      value={handleOptions()}
      renderOption={({ key, ...props }, option) => (
        <Typography key={key} {...props}>
          {option.label}
        </Typography>
      )}
      renderInput={(params) => <TextField {...params} error={error} label={label} />}
      onChange={(_, value) => handleChange(value)}
    />
  )
}

export default Autocomplete
