import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextBox from '@components/new/TextBox'

import SendIcon from '@mui/icons-material/Send'

import { useAuthContext } from '@pages/auth/auth.context'
import { useState } from 'react'

interface CommentBoxProps {
  to?: string
  mode?: 'COMMENT' | 'REPLY'
  onSend?: ValueCallback<string>
  onCancel?: Callback
}

const RecipientChip = ({ to }: { to: string }) => {
  return (
    <Stack pr={2} alignItems={'flex-start'}>
      <Chip size={'small'} label={`@${to}`} />
    </Stack>
  )
}

const CommentBox = ({ to, mode = 'COMMENT', onSend, onCancel }: CommentBoxProps) => {
  const { account } = useAuthContext()

  const [value, setValue] = useState('')

  const handleSend = () => {
    !!onSend && onSend(value)
    setValue('')
  }

  return (
    <Stack spacing={1}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Avatar src={account?.avatar ?? undefined} sx={{ width: 32, height: 32 }} />
        <TextBox
          fullWidth
          multiline
          maxRows={4}
          placeholder={'Напишите ваш комментарий...'}
          startAdornment={!!to && <RecipientChip to={to} />}
          value={value}
          onChange={(value) => setValue(value)}
        />
        {mode === 'COMMENT' && (
          <IconButton onClick={handleSend}>
            <SendIcon />
          </IconButton>
        )}
      </Stack>
      {mode === 'REPLY' && (
        <Stack direction={'row'} spacing={2}>
          <Button onClick={onCancel}>Отмена</Button>
          <Button onClick={handleSend}>Ответить</Button>
        </Stack>
      )}
    </Stack>
  )
}

export default CommentBox
