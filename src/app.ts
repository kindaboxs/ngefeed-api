import createApp from '@/lib/create-app';
import health from '@/routes/health.route';
import index from '@/routes/index.route';

const app = createApp();

const routes = [health, index] as const;

routes.forEach((route) => {
  app.basePath('/api').route('/', route);
});

export type AppType = (typeof routes)[number];

export default app;
