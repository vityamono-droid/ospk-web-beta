import { type ChangeEvent, type JSX, type KeyboardEvent } from 'react'
import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'

export type TextInputProps<TValue = any> = {
  maxLength?: number
  minLength?: number
  startAdornment?: JSX.Element
  endAdornment?: JSX.Element
  onEnterDown?: Callback
  onChange?: (value: TValue) => void
} & Omit<TextFieldProps, 'onChange' | 'size'>

const TextInput: <TValue = any>(props: TextInputProps<TValue>) => JSX.Element = (props) => {
  const { maxLength, minLength, startAdornment, endAdornment, onEnterDown, onChange, ...baseProps } = props
  const { slotProps } = baseProps

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key == 'Escape') {
      const active = document.activeElement as HTMLDivElement
      ;(active as any).blur && active?.blur()
    }

    if (onEnterDown) {
      event.preventDefault()
      onEnterDown()
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    !!onChange && onChange(event.target.value)
  }

  return (
    <TextField
      {...baseProps}
      size={'small'}
      slotProps={{
        ...slotProps,
        htmlInput: {
          ...slotProps?.htmlInput,
          maxLength: maxLength,
          minLength: minLength,
        },
        input: {
          ...slotProps?.input,
          startAdornment: startAdornment,
          endAdornment: endAdornment,
        },
        inputLabel: {
          ...slotProps?.inputLabel,
          shrink: baseProps.type === 'date' || baseProps.type === 'datetime-local' ? true : undefined,
        },
      }}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  )
}

export default TextInput
