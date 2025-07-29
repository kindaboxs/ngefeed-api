import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI, username } from 'better-auth/plugins';

import { db } from '@/db';
import { env } from '@/utils/env';

export const auth = betterAuth({
  baseURL: env.PUBLIC_BETTER_AUTH_URL,
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  logger: {
    level: env.NODE_ENV === 'production' ? 'error' : 'debug',
  },
  plugins: [username(), openAPI()],
  trustedOrigins: env.PUBLIC_CORS_ORIGINS.split(','),
  secret: env.BETTER_AUTH_SECRET,
});
