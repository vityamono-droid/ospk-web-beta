import FormControlLabel from '@mui/material/FormControlLabel'
import BaseSwitch from '@mui/material/Switch'
import type { SwitchProps as SwitchPropsBase } from '@mui/material/Switch'

interface SwitchProps extends Omit<SwitchPropsBase, 'onChange'> {
  label?: string
  onChange?: (value: boolean) => void
}

const Switch = ({ label, onChange, ...props }: SwitchProps) => {
  return (
    <FormControlLabel
      control={<BaseSwitch {...props} onChange={({ target }) => !!onChange && onChange(target.checked)} />}
      label={label}
    />
  )
}

export default Switch
