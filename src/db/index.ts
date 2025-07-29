import { PrismaClient } from '@/lib/generated/prisma/client';
import { cusLog } from '@/middlewares';
import { env } from '@/utils/env';

function createPrismaClient() {
  return new PrismaClient({
    log:
      env.NODE_ENV === 'production'
        ? [{ level: 'error', emit: 'event' }]
        : [
            { level: 'query', emit: 'event' },
            { level: 'error', emit: 'event' },
            { level: 'info', emit: 'event' },
            { level: 'warn', emit: 'event' },
          ],
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

db.$on('query', (e) => {
  cusLog.info(`Query: ${e.query}`);
  cusLog.info(`Params: ${e.params}`);
  cusLog.info(`Duration: ${e.duration}ms`);
});

db.$on('error', (e) => {
  cusLog.error(`Error: ${e.message}`);
});

db.$on('info', (e) => {
  cusLog.info(`Info: ${e.message}`);
});

db.$on('warn', (e) => {
  cusLog.warn(`Warn: ${e.message}`);
});
