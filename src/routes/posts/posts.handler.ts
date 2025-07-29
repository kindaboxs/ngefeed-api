import type { PaginatedResponse, Post, SuccessResponse } from '@/types';

import { zValidator } from '@hono/zod-validator';
import factory from '@/lib/factory';
import { authMiddleware, optionalAuthMiddleware } from '@/middlewares/auth';
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes';
import { createPostSchema, postsQuerySchema } from '@/validations';

// get all posts (public)
export const getAll = factory.createHandlers(
  optionalAuthMiddleware,
  zValidator('query', postsQuerySchema),
  async (c) => {
    const { limit, page, sort, order, author, site } = c.req.valid('query');

    const user = c.get('user');

    const offset = (page - 1) * limit;
    const orderBy =
      sort === 'hot'
        ? [{ points: order }, { createdAt: order }]
        : sort === 'top'
          ? { points: order }
          : { createdAt: order };

    const where = {
      ...(author && { username: author }),
      ...(site && { url: { contains: site } }),
    };

    const count = await c.var.db.post.count({ where });

    const posts = await c.var.db.post.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        ...(user && {
          postUpvotes: {
            where: { userId: user.id },
            select: {
              userId: true,
            },
          },
        }),
      },
    });

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      url: post.url,
      content: post.content,
      points: post.points,
      commentCount: post.commentCount,
      author: post.author,
      isUpvoted: user ? post.postUpvotes.length > 0 : false,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })) as Post[];

    const result: PaginatedResponse<Post[]> = {
      success: true,
      message: 'Posts fetched',
      pagination: {
        page,
        totalPages: Math.ceil(count / limit),
      },
      data: formattedPosts,
    };

    return c.json(result, HTTP_STATUS_CODES.OK);
  }
);

// create post (private)
export const create = factory.createHandlers(
  authMiddleware,
  zValidator('json', createPostSchema),
  async (c) => {
    const { title, url, content } = c.req.valid('json');

    const user = c.get('user')!;

    const post = await c.var.db.post.create({
      data: {
        title,
        url,
        content,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    const result: SuccessResponse<{ postId: number }> = {
      success: true,
      message: 'Post created',
      data: {
        postId: post.id,
      },
    };

    return c.json(result, HTTP_STATUS_CODES.CREATED);
  }
);
