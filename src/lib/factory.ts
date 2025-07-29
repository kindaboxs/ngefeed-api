import type { AppBindings } from '@/types/app-bindings';

import { createFactory } from 'hono/factory';
import { db } from '@/db';

export default createFactory<AppBindings>({
  initApp: (app) => {
    // Inject database client
    app.use('*', async (c, next) => {
      c.set('db', db);

      await next();
    });
  },

  defaultAppOptions: {
    strict: false,
  },
});
