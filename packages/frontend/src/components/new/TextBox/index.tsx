import TextInput, { type TextInputProps } from '../TextInput'

const TextBox = (props: TextInputProps<string>) => {
  return <TextInput {...props} />
}

export default TextBox
