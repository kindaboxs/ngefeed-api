import { format } from 'date-fns';
import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pinoPretty from 'pino-pretty';

import { env } from '@/utils/env';

export function logger() {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL,
      },
      env.NODE_ENV === 'production' ? undefined : pinoPretty()
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}

const formatTime = () => format(new Date(), 'HH:mm:ss');

export const cusLog = pino(
  {
    base: { pid: false },
    timestamp: () => `,"time":"${formatTime()}"`,
  },
  pinoPretty()
);
