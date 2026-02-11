import TextBox from '@components/new/TextBox'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'

const CommentBox = () => {
  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'}>
      <TextBox fullWidth multiline maxRows={4} placeholder={'Напишите ваш комментарий...'} />
      <IconButton size={'small'}>
        <SendIcon />
      </IconButton>
    </Stack>
  )
}

export default CommentBox
