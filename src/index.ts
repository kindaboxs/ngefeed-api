import { serve } from '@hono/node-server';

import app from '@/app';
import { cusLog } from '@/middlewares';
import { env } from '@/utils/env';

const port = env.PORT;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    cusLog.info(`Server is running on http://localhost:${info.port}`);
  }
);
