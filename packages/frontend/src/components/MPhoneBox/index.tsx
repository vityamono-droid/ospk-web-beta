import React from 'react'
import { IMaskInput } from 'react-imask'

interface MPhoneBoxProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const MPhoneBox = React.forwardRef<HTMLInputElement, MPhoneBoxProps>(({ onChange, ...props }, ref) => {
  return (
    <IMaskInput
      {...props}
      mask={'+7 (000) 000-00-00'}
      inputRef={ref}
      unmask={true}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

export default MPhoneBox
