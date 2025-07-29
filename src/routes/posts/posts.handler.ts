import type { SuccessResponse } from '@/types';

import { zValidator } from '@hono/zod-validator';
import factory from '@/lib/factory';
import { authMiddleware } from '@/middlewares/auth';
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes';
import { createPostSchema } from '@/validations';

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
