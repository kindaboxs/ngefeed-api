import factory from '@/lib/factory';
import * as handlers from '@/routes/posts/posts.handler';

const posts = factory.createApp().basePath('/posts');

// get all posts (public)
posts.get('/', ...handlers.getAll);

// get one post (public)
posts.get('/:id', ...handlers.getOne);

// create post (private)
posts.post('/', ...handlers.create);

export default posts;
