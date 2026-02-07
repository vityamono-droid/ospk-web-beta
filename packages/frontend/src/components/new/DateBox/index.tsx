import type { TextInputProps } from '../TextInput';
import TextInput from '../TextInput';

const DateBox = (props: TextInputProps<Date>) => {
  return <TextInput {...props} type={'date'} />
}

export default DateBox
