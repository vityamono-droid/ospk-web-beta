import { useState } from 'react';
import type { TextInputProps } from '../TextInput';
import TextInput from '../TextInput';
import ShowIcon from '@mui/icons-material/Visibility'
import HideIcon from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'

const VisibilityButton = ({ show, onClick }: { show: boolean, onClick: () => void }) => {
  return (
    <IconButton size={'small'} disableRipple onClick={onClick}>
      {show ? <HideIcon fontSize={'small'} /> : <ShowIcon fontSize={'small'} />}
    </IconButton>
  )
}

const PasswordBox = (props: TextInputProps<string>) => {
  const [show, setShow] = useState(false)

  return (
    <TextInput
      {...props}
      type={show ? 'text' : 'password'}
      endAdornment={<VisibilityButton show={show} onClick={() => setShow((state) => !state)} />}
    />
  )
}

export default PasswordBox
