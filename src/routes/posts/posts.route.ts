import factory from '@/lib/factory';
import * as handlers from '@/routes/posts/posts.handler';

const posts = factory.createApp().basePath('/posts');

posts.post('/', ...handlers.create);

export default posts;
