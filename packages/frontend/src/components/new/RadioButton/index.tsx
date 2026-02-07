import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio, { type RadioProps } from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import type { JSX } from 'react'

interface RadioItem<TValue = any> {
  key?: string
  label: string | JSX.Element
  value: TValue
  disabled?: boolean
}

interface RadioButtonProps<TValue = any> extends Omit<RadioProps, 'onChange' | 'size' | 'disabled'> {
  label?: string | JSX.Element
  items?: RadioItem<TValue>[]
  value?: TValue
  disabled?: boolean
  direction?: 'row' | 'column'
  onChange?: (value: TValue) => void
}

const RadioButton = ({ label, items, value, disabled, direction, onChange, ...baseProps }: RadioButtonProps) => {
  const handleChange = (value: boolean) => {
    !!onChange && onChange(value)
  }

  return (
    <FormControl>
      {label &&
        (typeof label === 'string' ? (
          <Typography variant={'h6'} color={disabled ? 'grey' : 'initial'} sx={{ my: 1 }}>
            {label}
          </Typography>
        ) : (
          <>{label}</>
        ))}
      <RadioGroup row={direction === 'row'} sx={{ gap: direction === 'row' ? 0 : 1.5 }}>
        {items?.map(({ key, label, ...item }) => (
          <FormControlLabel
            key={key ?? item.value}
            control={
              <Radio
                {...baseProps}
                size={'small'}
                disabled={disabled ? disabled : item.disabled}
                checked={value == item.value}
                onChange={() => handleChange(item.value)}
              />
            }
            label={
              typeof label === 'string' ? (
                <Typography color={disabled || item.disabled ? 'grey' : 'initial'}>{label}</Typography>
              ) : (
                label
              )
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioButton
