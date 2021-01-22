process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from './index';
import db from './db/connection';

describe('/', () => {
  afterAll(() => {
    db.destroy();
  });
  test('GET:200, returns a health checker route', () => {
    request(app)
      .get('/')
      .expect(200)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('OK');
      });
  });
});
