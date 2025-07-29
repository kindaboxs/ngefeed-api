import createApp from '@/lib/create-app';
import auth from '@/routes/auth.route';
import health from '@/routes/health.route';
import index from '@/routes/index.route';

const app = createApp();

const routes = [auth, health, index] as const;

routes.forEach((route) => {
  app.basePath('/api').route('/', route);
});

export type AppType = (typeof routes)[number];

export default app;
