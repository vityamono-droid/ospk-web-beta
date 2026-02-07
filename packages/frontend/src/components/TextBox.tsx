import TextField, { type TextFieldProps } from '@mui/material/TextField'

interface TextBoxProps extends Omit<TextFieldProps, 'onChange'> {
  maxLength?: number
  onChange?: (value: any) => void
}

const TextBox = ({ onChange, maxLength, ...props }: TextBoxProps) => {
  return (
    <TextField
      {...props}
      onChange={({ target }) => !!onChange && onChange(target.value)}
      slotProps={{
        inputLabel: { shrink: (props.type === 'date' || props.type === 'datetime-local') ? true : undefined },
        htmlInput: {
          maxLength: maxLength
        }
      }}
    />
  )
}

export default TextBox
