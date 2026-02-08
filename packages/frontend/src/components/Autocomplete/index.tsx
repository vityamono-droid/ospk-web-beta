import MuiAutocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { JSX } from 'react'

interface AutocompleteProps<TValue> {
  label?: string
  error?: boolean
  loading?: boolean
  //multiple?: boolean
  disabled?: boolean
  options?: { label: string; value: TValue }[]
  value?: TValue
  fullWidth?: boolean
  onChange?: (value?: TValue | TValue[]) => void
}

const Autocomplete: (<TValue>(props: AutocompleteProps<TValue>) => JSX.Element) = (props) => {
  const { label, error, loading, disabled, options = [], value, fullWidth, onChange } = props

  return (
    <MuiAutocomplete
      size={'small'}
      fullWidth={fullWidth}
      loading={loading}
      // multiple={multiple}
      disabled={disabled}
      options={options}
      value={options.find((item) => item.value == value) ?? null}
      renderOption={({ key, ...props }, option) => (
        <Typography key={key} {...props}>
          {option.label}
        </Typography>
      )}
      renderInput={(params) => <TextField {...params} error={error} label={label} />}
      onChange={(_, value) => !!onChange && onChange(!!value ? value.value : undefined)}
    />
  )
}

export default Autocomplete
