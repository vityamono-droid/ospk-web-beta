import FormControlLabel from '@mui/material/FormControlLabel'
import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'
import { type JSX } from 'react'
import Typography from '@mui/material/Typography'

interface CheckboxProps extends Omit<MuiCheckboxProps, 'onChange' | 'size'> {
  label?: string | JSX.Element
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}

const Checkbox = ({ label, checked, indeterminate, disabled, onChange, ...baseProps }: CheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          {...baseProps}
          size={'small'}
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          onChange={(_, value) => !!onChange && onChange(value)}
        />
      }
      label={
        typeof label === 'string' ? (
          <Typography color={disabled ? 'grey' : 'initial'}>
            {label}
          </Typography>
        ) : (
          label
        )
      }
      onClick={(event) => event.stopPropagation()}
    />
  )
}

export default Checkbox
