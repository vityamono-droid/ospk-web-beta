import { useLoginMutation } from '@api/common/auth/auth.api'
import PasswordBox from '@components/new/PasswordBox'
import TextBox from '@components/new/TextBox'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { LoginRequest } from '@ospk/web-models/auth'
import { useNavigate } from 'react-router'

const LoginPage = () => {
  const navigate = useNavigate()

  const [login, response] = useLoginMutation()
  const [error, analyze] = useAnalyzeRequired<LoginRequest>(['email', 'password'])
  const [form, _, setFormProp] = useObjectState<LoginRequest>({
    email: '',
    password: ''
  })

  const handleSignIn = () => {
    const data = {
      ...form,
      email: form.email.trim(),
      password: form.password.trim(),
    }

    if (!analyze(data)) {
      return
    }

    login(data)
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
        <Button fullWidth variant={'outlined'} onClick={() => navigate(`../register${location.search}`)}>
          Регистрация
        </Button>
        <Button fullWidth variant={'contained'} onClick={handleSignIn}>
          Войти
        </Button>
      </Stack>
    </>
  )
}

export default LoginPage
