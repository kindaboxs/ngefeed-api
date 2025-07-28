import factory from '@/lib/factory';
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes';
import * as HTTP_STATUS_PHRASES from '@/utils/http-status-phrases';

const health = factory.createApp().basePath('/health');

health.get('/', (c) => {
  return c.json(
    {
      success: true,
      message: HTTP_STATUS_PHRASES.OK,
      timestamp: new Date().toISOString(),
    },
    HTTP_STATUS_CODES.OK
  );
});

export default health;
