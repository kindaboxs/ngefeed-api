import { z } from 'zod';

export const createPostSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(300, 'Title too long'),
    url: z.string().url('Invalid URL').optional(),
    content: z.string().max(10000, 'Content too long').optional(),
  })
  .refine((data) => data.url || data.content, {
    message: 'Either URL or content is required',
    path: ['url', 'content'],
  });
