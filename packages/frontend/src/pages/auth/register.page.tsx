import { useRegisterMutation } from '@api/common/auth/auth.api'
import PasswordBox from '@components/new/PasswordBox'
import TextBox from '@components/new/TextBox'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type {  RegisterRequest } from '@ospk/web-models/auth'
import { useNavigate } from 'react-router'

const LoginPage = () => {
  const navigate = useNavigate()

  const [register, response] = useRegisterMutation()
  const [error, analyze] = useAnalyzeRequired<RegisterRequest>(['phone', 'email', 'password'])
  const [form, _, setFormProp] = useObjectState<RegisterRequest>({
    phone: '',
    email: '',
    password: '',
  })

  const handleSignUp = () => {
    const data = {
      ...form,
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    }

    if (!analyze(data)) {
      return
    }

    register(data)
  }

  return (
    <>
      {response.isError && (
        <Alert severity={'error'}>
          <Typography>Неверный логин или пароль</Typography>
        </Alert>
      )}
      <Stack spacing={2}>
        <TextBox
          label={'Телефон'}
          error={error.phone}
          type={'phone'}
          value={form.phone}
          onChange={(value) => setFormProp({ phone: value })}
        />
        <TextBox
          label={'Email'}
          error={error.email}
          type={'email'}
          value={form.email}
          onChange={(value) => setFormProp({ email: value })}
        />
        <PasswordBox
          label={'Пароль'}
          error={error.password}
          value={form.password}
          onChange={(value) => setFormProp({ password: value })}
        />
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Button fullWidth variant={'outlined'} onClick={() => navigate('../login')}>
          Вход
        </Button>
        <Button fullWidth variant={'contained'} onClick={handleSignUp}>
          Зарегистрироваться
        </Button>
      </Stack>
    </>
  )
}

export default LoginPage
