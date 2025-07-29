import type { PinoLogger } from 'hono-pino';
import type { PrismaClient } from '@/lib/generated/prisma/client';

export interface AppBindings {
  Variables: {
    db: PrismaClient;
    logger: PinoLogger;
  };
}
