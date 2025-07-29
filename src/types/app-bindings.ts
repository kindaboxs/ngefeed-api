import type { PinoLogger } from 'hono-pino';

import type { Session, User } from '@/lib/auth/types';
import type { PrismaClient } from '@/lib/generated/prisma/client';

export interface AppBindings {
  Variables: {
    db: PrismaClient;
    logger: PinoLogger;
    user: User | null;
    session: Session | null;
  };
}
