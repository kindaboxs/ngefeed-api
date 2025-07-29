import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';

import factory from '@/lib/factory';
import { logger, notFound, onError, serveEmojiFavicon } from '@/middlewares';
import { env } from '@/utils/env';

const allowedOrigins = env.PUBLIC_CORS_ORIGINS.split(',');

const corsOptions = {
  origin: allowedOrigins,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

export default function createApp() {
  const app = factory.createApp();
  app.use('*', logger());
  app.use('*', prettyJSON());
  app.use('*', cors(corsOptions));
  app.use('*', serveEmojiFavicon('🔥'));

  app.onError(onError);
  app.notFound(notFound);

  return app;
}
