import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import CommentBox from './CommentBox'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ReplyIcon from '@mui/icons-material/Reply'
import UpvoteIcon from '@mui/icons-material/ArrowUpward'
import DownvoteIcon from '@mui/icons-material/ArrowDownward'
import ChevronUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown'
import OspkLogo from '@assets/ospk-logo.svg'

import { useState } from 'react'

import type { CommentData, ListCommentsQuery } from '@ospk/web-models/comments'
import { useAuthContext } from '@pages/auth/auth.context'
import { useAddCommentMutation, useVoteCommentMutation } from '@api/client/comments.api'

interface CommentItemProps {
  data: TreeViewItem<CommentData>
  query: ListCommentsQuery
}

const CommentItem = ({ data, query }: CommentItemProps) => {
  return (
    <Stack spacing={1} width={'100%'}>
      <CommentAvatar data={data} />
      <CommentContent data={data} query={query} />
      <CommentReplies data={data} query={query} />
    </Stack>
  )
}

const CommentAvatar = ({ data }: { data: TreeViewItem<CommentData> }) => {
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <Avatar
        src={data.isStaff ? OspkLogo : (data.avatar ?? undefined)}
        sx={{ width: 32, height: 32, border: '1px solid gray' }}
      />
      {data.fullName && <Typography>{data.fullName}</Typography>}
      {data.isStaff && <Chip size={'small'} color={'primary'} label={'Админ'} />}
    </Stack>
  )
}

const CommentContent = ({ data, query }: CommentItemProps) => {
  const { account } = useAuthContext()

  const upVotes = data.votes.filter((item) => item.direction === 'UP_VOTE').reduce((prev) => prev + 1, 0)
  const downVotes = data.votes.filter((item) => item.direction === 'DOWN_VOTE').reduce((prev) => prev + 1, 0)

  const lastVote = data.votes.find((item) => item.profileId != null)

  const [reply, setReply] = useState(false)

  const [addComment] = useAddCommentMutation()
  const [voteComment] = useVoteCommentMutation()

  const handleVote = (direction: 'UP_VOTE' | 'DOWN_VOTE') => () => {
    voteComment({ id: data.id, data: { direction } })
  }

  const handleReply = (value: string) => {
    addComment({
      ...query,
      content: value,
      parentId: data.id,
    })

    setReply(false)
  }

  return (
    <Stack direction={'row'} spacing={1}>
      <Stack minWidth={32} direction={'row'}>
        {data.children && data.children.length > 0 && <Box my={-1} width={16} borderRight={'2px solid gray'} />}
      </Stack>
      {/* Content */}
      <Stack spacing={1} width={'100%'}>
        {/* Comment */}
        <Typography>{data.content}</Typography>
        {/* Actions */}
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Stack border={'2px solid gray'} borderRadius={12} direction={'row'} spacing={2} alignItems={'center'}>
            <IconButton size={'small'} disabled={!account} onClick={handleVote('UP_VOTE')}>
              <UpvoteIcon fontSize={'small'} />
            </IconButton>
            <Typography>{upVotes - downVotes}</Typography>
            <IconButton size={'small'} disabled={!account} onClick={handleVote('DOWN_VOTE')}>
              <DownvoteIcon fontSize={'small'} />
            </IconButton>
          </Stack>
          <Button
            endIcon={<ReplyIcon />}
            disabled={!account}
            sx={{ textTransform: 'none' }}
            onClick={() => setReply((state) => !state)}>
            Ответить
          </Button>
        </Stack>
        {/* Reply */}
        {!!account && reply && (
          <CommentBox to={data.fullName} mode={'REPLY'} onSend={handleReply} onCancel={() => setReply((state) => !state)} />
        )}
      </Stack>
    </Stack>
  )
}

const CommentReplies = ({ data, query }: CommentItemProps) => {
  const [show, setShow] = useState(false)

  return (
    <>
      {!!data.children && data.children.length > 0 && (
        <Stack direction={'row'} spacing={1}>
          <Stack minWidth={32} alignItems={'flex-end'} justifyContent={'flex-start'}>
            <Box
              width={16}
              height={show ? '100%' : 16}
              mb={show ? 2 : 0}
              borderRadius={'0 0 0 12px'}
              borderLeft={'2px solid gray'}
              borderBottom={'2px solid gray'}
            />
          </Stack>
          <Stack spacing={1} width={'100%'}>
            {/* Replies */}
            <Collapse in={show} orientation={'vertical'} sx={{ width: '100%' }}>
              <Stack spacing={1}>
                {data.children.map((item) => (
                  <Stack direction={'row'}>
                    <Stack ml={-5} minWidth={32} alignItems={'flex-end'} justifyContent={'flex-start'}>
                      <Box
                        width={16}
                        height={16}
                        mb={show ? 2 : 0}
                        borderRadius={'0 0 0 12px'}
                        borderLeft={'2px solid gray'}
                        borderBottom={'2px solid gray'}
                      />
                    </Stack>
                    <CommentItem data={item} query={query} />
                  </Stack>
                ))}
              </Stack>
            </Collapse>
            {/* Show/hide button */}
            <Stack direction={'row'}>
              <Button
                startIcon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
                sx={{ textTransform: 'none' }}
                onClick={() => setShow((state) => !state)}>
                {show ? 'Скрыть ответы' : 'Показать еще'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export default CommentItem
