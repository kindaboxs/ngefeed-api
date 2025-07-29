import { auth } from '@/lib/auth';
import factory from '@/lib/factory';

const authRoute = factory.createApp().basePath('/auth');

authRoute.on(['POST', 'GET'], '/*', (c) => {
  return auth.handler(c.req.raw);
});

export default authRoute;
