import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useVerifyAccountMutation } from '@api/common/auth/accounts.api'
import useStatusEffect from '@hooks/useStatusEffect'

const VerifyPage = () => {
  const navigate = useNavigate()

  const [verifyAccount, verifyResponse] = useVerifyAccountMutation()

  useEffect(() => {
    setTimeout(() => {
      verifyAccount({})
    }, 2000)
  }, [])

  useStatusEffect(() => {
    navigate(new URLSearchParams(location.search).get('referer') ?? '/')
  }, [verifyResponse])

  return (
    <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
      <CircularProgress size={64} />
    </Stack>
  )
}

export default VerifyPage
