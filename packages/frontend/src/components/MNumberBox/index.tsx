import React from 'react'
import { IMaskInput } from 'react-imask'
import type { InputBaseComponentProps } from '@mui/material/InputBase'

interface MNumberBoxProps extends Omit<InputBaseComponentProps, 'onChange'> {
  onChange: (event: { target: { name: string; value: string } }) => void
  min: number
  max: number
  name: string
}

const MNumberBox = React.forwardRef<HTMLInputElement, MNumberBoxProps>(({ onChange, min, max, ...props }, ref) => {
  return (
    <IMaskInput
      {...props}
      mask={Number}
      radix={','}
      min={min}
      max={max}
      inputRef={ref}
      unmask={true}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

export default MNumberBox
