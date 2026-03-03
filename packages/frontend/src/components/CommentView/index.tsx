import Stack from '@mui/material/Stack'
import CommentBox from './CommentBox'
import CommentItem from './CommentItem'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { useAuthContext } from '@pages/auth/auth.context'

import unFlatten from '@utils/unFlatten'
import Link from '@mui/material/Link'
import { useAuthorizeMutation } from '@api/common/auth/auth.api'
import { useAddCommentMutation, useListCommentQuery } from '@api/client/comments.api'
import { useState } from 'react'
import type { CommentData, ListCommentsQuery } from '@ospk/web-models/comments'
import useStatusEffect from '@hooks/useStatusEffect'

const CommentView = (props: ListCommentsQuery) => {
  const { account } = useAuthContext()

  const [comments, setComments] = useState<CommentData[]>([])
  const [authorize] = useAuthorizeMutation()
  const [addComment] = useAddCommentMutation()

  const listResponse = useListCommentQuery(props, {
    skip: Object.values(props).every((item) => !item || typeof item === 'undefined' || item === null),
    refetchOnMountOrArgChange: true,
  })

  useStatusEffect(() => setComments(listResponse.data ?? []), [listResponse])

  const handleReply = (value: string) => {
    addComment({
      ...props,
      content: value,
      parentId: null,
    })
  }

  return (
    <>
      {!!account ? (
        <CommentBox onSend={handleReply} />
      ) : (
        <Paper variant={'outlined'}>
          <Stack p={1}>
            <Typography>
              Чтобы оставить комментарий, нужно <Link onClick={() => authorize({})}>войти</Link> в аккаунт
            </Typography>
          </Stack>
        </Paper>
      )}
      <Stack spacing={1}>
        {unFlatten(comments).map((item) => (
          <CommentItem data={item} query={props} />
        ))}
      </Stack>
    </>
  )
}

export default CommentView
