process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from './index';
import db from './db/connection';

import filmsData from './db/data/films.json';

describe('/', () => {
  beforeAll(async () => {
    await db.seed.run();
  });
  afterAll(async () => {
    await db.destroy();
  });
  test('GET:200, returns a health checker route', () => {
    request(app)
      .get('/')
      .expect(200)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('OK');
      });
  });
  describe('/api', () => {
    describe('/films', () => {
      test('GET:200, returns an array of all films', async () => {
        return request(app)
          .get('/api/films')
          .expect(200)
          .then(({ body: { films } }) => {
            expect(new Set(films)).toStrictEqual(new Set(filmsData));
          });
      });
    });
  });
});
