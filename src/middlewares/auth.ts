import { HTTPException } from 'hono/http-exception';

import { auth } from '@/lib/auth';
import factory from '@/lib/factory';
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes';

export const authMiddleware = factory.createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new HTTPException(HTTP_STATUS_CODES.UNAUTHORIZED, {
      message: 'Unauthorized',
    });
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

export const optionalAuthMiddleware = factory.createMiddleware(
  async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (session) {
      c.set('user', session.user);
      c.set('session', session.session);
    }

    c.set('user', null);
    c.set('session', null);
    return next();
  }
);
