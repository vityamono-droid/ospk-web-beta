import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CommentData, UpsertCommentData, ListCommentsQuery } from '@ospk/web-models/comments'

type ListCommentsRequest = RequestHandler<any, ApiResponse<CommentData[]>, any, ListCommentsQuery>
export const listComments: ListCommentsRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const comments = await prisma.comment.findMany({
      where: {
        newsId: req.query.newsId,
        serviceId: req.query.serviceId,
        forumPostId: req.query.forumPostId,
      },
      select: {
        id: true,
        content: true,
        parentId: true,
        votes: {
          select: {
            direction: true,
          },
        },
        profile: {
          include: { user: {
            include: { roles: true }
          } },
        },
      },
    })

    const isStaff = (item: (typeof comments)[number]) => {
      const user = item.profile.user
      if (!user || user.roles.length == 0) {
        return false
      }

      return ['admin', 'moder'].some((item) => user.roles.map((item) => item.name).includes(item))
    }

    res.json({
      error: false,
      data: comments.map((item) => ({
        ...item,
        profile: undefined,
        votes: undefined,
        isStaff: isStaff(item),
        upVotes: item.votes.filter((item) => item.direction === 'UP_VOTE').length,
        downVotes: item.votes.filter((item) => item.direction === 'DOWN_VOTE').length,
        fullName: isStaff(item)
          ? ''
          : `${item.profile.user?.firstName ?? ''} ${item.profile.user?.patronymic ?? ''} ${item.profile.user?.patronymic?.at(0) ?? ''}`.trim(),
        avatar: item.profile.user?.avatar ?? null,
      })),
    })
  } catch (err) {
    next(err)
  }
}

type AddCommentRequest = RequestHandler<any, ApiResponse, UpsertCommentData>
export const addComment: AddCommentRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (req.session.user && req.session.user.profileId) {
      await prisma.comment.create({
        data: {
          ...req.body,
          profileId: req.session.user.profileId,
        },
      })
    }

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
