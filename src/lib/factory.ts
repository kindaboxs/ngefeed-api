import { Hono } from 'hono';
import { createFactory } from 'hono/factory';

const factory = createFactory({
  initApp: () => new Hono(),
  defaultAppOptions: {
    strict: false,
  },
});

export default factory;
