import { prettyJSON } from 'hono/pretty-json';

import factory from '@/lib/factory';
import { logger, notFound, onError, serveEmojiFavicon } from '@/middlewares';

export default function createApp() {
  const app = factory.createApp();
  app.use('*', logger());
  app.use('*', prettyJSON());
  app.use('*', serveEmojiFavicon('🔥'));

  app.onError(onError);
  app.notFound(notFound);

  return app;
}
