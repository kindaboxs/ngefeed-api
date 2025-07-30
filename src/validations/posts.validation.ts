import { z } from 'zod';

const sortSchema = z.enum(['hot', 'top', 'newest']);
const orderSchema = z.enum(['asc', 'desc']);

export const postsQuerySchema = z.object({
  limit: z.coerce.number().min(10).max(100).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
  sort: sortSchema.optional().default('hot'),
  order: orderSchema.optional().default('desc'),
  author: z.optional(z.string()),
  site: z.string().optional(),
});

export const postIdSchema = z.object({
  id: z.coerce.number().min(1),
});

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

export const updatePostSchema = createPostSchema.partial().refine(
  (data) => {
    return Object.values(data).some((value) => value !== undefined);
  },
  {
    message: 'At least one field must be provided to update',
    path: ['url', 'content'],
  }
);
