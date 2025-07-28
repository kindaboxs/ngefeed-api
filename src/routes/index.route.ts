import factory from '@/lib/factory';

const index = factory.createApp().basePath('/');

index.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default index;
