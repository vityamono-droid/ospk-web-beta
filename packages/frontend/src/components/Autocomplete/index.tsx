import MuiAutocomplete, { type AutocompleteValue } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

type LabelValue = {
  label: string
  value: string | number
}

interface AutocompleteProps<TValue extends LabelValue['value'], TMultiple extends boolean | undefined = false> {
  label?: string
  error?: boolean
  loading?: boolean
  multiple?: TMultiple
  disabled?: boolean
  options?: LabelValue[]
  fullWidth?: boolean
  value?: TMultiple extends false ? TValue : TValue[]
  onChange?: (value: null | (TMultiple extends false ? TValue : TValue[])) => void
}

const Autocomplete = <TValue extends LabelValue['value'], TMultiple extends boolean | undefined = false>(
  props: AutocompleteProps<TValue, TMultiple>,
) => {
  const { label, error, loading, multiple, disabled, options = [], value, fullWidth, onChange } = props
  const renderValue: any = !!value
    ? Array.isArray(value)
      ? options.filter((item) => value.includes(item.value as any))
      : (options.find((item) => item.value == value) ?? null)
    : null

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: AutocompleteValue<LabelValue, TMultiple, false, false>,
  ) => {
    if (!value) {
      !!onChange && onChange(null)
      return
    }

    let newValue: any = null
    if (Array.isArray(value) && multiple) {
      newValue = value.map((item) => item.value)
    } else if (!Array.isArray(value) && !multiple) {
      newValue = value.value
    }

    !!onChange && onChange(newValue)
  }

  return (
    <MuiAutocomplete
      multiple={multiple}
      loading={loading}
      fullWidth={fullWidth}
      disabled={disabled}
      size={'small'}
      options={options}
      value={renderValue}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} error={error} label={label} />}
    />
  )
}

export default Autocomplete
