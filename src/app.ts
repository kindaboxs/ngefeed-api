import createApp from '@/lib/create-app';
import auth from '@/routes/auth.route';
import health from '@/routes/health.route';
import index from '@/routes/index.route';
import posts from '@/routes/posts/posts.route';

const app = createApp();

const routes = [auth, health, index, posts] as const;

routes.forEach((route) => {
  app.basePath('/api').route('/', route);
});

export type AppType = (typeof routes)[number];

export default app;
