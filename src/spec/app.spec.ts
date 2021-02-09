process.env.NODE_ENV = 'test';

import request from 'supertest';
import app from '../index';
import db from '../db/connection';

import filmsData from '../db/data/films.json';
import usersData from '../db/data/users.json';

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
  test('GET:404, returns a not found for routes not declared', () => {
    request(app)
      .get('/abc')
      .expect(404)
      .then(({ body }) => {
        expect(body).toStrictEqual({ msg: 'not found' });
      });
  });
  describe('/api', () => {
    describe('/films', () => {
      test('GET:200, returns an array of all films', () => {
        return request(app)
          .get('/api/films')
          .expect(200)
          .then(({ body: { films } }) => {
            expect(new Set(films)).toStrictEqual(new Set(filmsData));
          });
      });
      test('POST:201, inserts new film when correct data is passed', () => {
        const filmData = {
          title: 'Dalek Attack',
          description: 'A film of the first Dalek attack.',
          year: 1954,
          keywords: '',
        };
        return request(app).post('/api/films').send(filmData).expect(201);
      });
      test('POST:400, returns an error if missing or invalid data passed', () => {
        const filmData = {};
        return request(app)
          .post('/api/films')
          .send(filmData)
          .expect(400)
          .then(({ body }) => {
            expect(body).toStrictEqual({ msg: 'invalid or missing data' });
          });
      });
      test('PUT:405, returns a 405 error for not allowed methods', () => {
        return request(app)
          .put('/api/films')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      test('PATCH:405, returns a 405 error for not allowed methods', () => {
        return request(app)
          .patch('/api/films')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      test('DELETE:405, returns a 405 error for not allowed methods', () => {
        return request(app)
          .delete('/api/films')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      describe('/:filmId', () => {
        const filmId = 'ea32d99f-d4ef-4f1c-8fa1-61ab470a52a2';
        test('GET:200, returns a single film object when matched', () => {
          return request(app)
            .get(`/api/films/${filmId}`)
            .expect(200)
            .then(({ body: { film } }) => {
              expect(film).toStrictEqual({
                uid: 'ea32d99f-d4ef-4f1c-8fa1-61ab470a52a2',
                title: 'Super CatDog',
                description: "A strange tale of a dog with a cat's tail.",
                year: 2020,
                keywords: 'strange,odd,pointless',
              });
            });
        });
        test('GET:404, returns error if filmId is not matched', () => {
          const uuid = 'not-a-uuid';
          return request(app)
            .get(`/api/films/${uuid}`)
            .expect(404)
            .then(({ body }) => {
              expect(body).toStrictEqual({
                msg: `filmId - ${uuid} - not matched`,
              });
            });
        });
        test('PATCH:200, updates a film with passed data', () => {
          return request(app)
            .patch(`/api/films/${filmId}`)
            .send({ filmData: { year: 2021, title: 'Super CatHotDog' } })
            .expect(200)
            .then(({ body: { msg } }) => {
              expect(msg).toBe(`${filmId} updated`);
            })
            .then(() => {
              return request(app)
                .get(`/api/films/${filmId}`)
                .expect(200)
                .then(({ body: { film } }) => {
                  expect(film).toStrictEqual({
                    uid: 'ea32d99f-d4ef-4f1c-8fa1-61ab470a52a2',
                    title: 'Super CatHotDog',
                    description: "A strange tale of a dog with a cat's tail.",
                    year: 2021,
                    keywords: 'strange,odd,pointless',
                  });
                });
            });
        });
        test('PATCH:400, returns an error if invalid data is passed', () => {
          return request(app)
            .patch(`/api/films/${filmId}`)
            .send({ filmData: { year: 'year ninety-nine' } })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('invalid or missing data');
            });
        });
        test('PATCH:404, returns an error if filmId does not exist', () => {
          return request(app)
            .patch('/api/films/abcd-uuid')
            .send({ filmData: { year: 2000 } })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('not found');
            });
        });
        test('DELETE: 204, deletes a film  when passed a correct ID', () => {
          return request(app)
            .delete(`/api/films/${filmId}`)
            .expect(204)
            .then(() => {
              return request(app).get(`/api/films/${filmId}`).expect(404);
            });
        });
        test('DELETE: 404, returns an error if film is not found', () => {
          return request(app)
            .delete('/api/films/not-an-id')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('not found');
            });
        });
        test('PUT:405, returns a 405 error for not allowed methods', () => {
          return request(app)
            .put('/api/films/id23')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('method not allowed');
            });
        });
      });
    });
    describe('/users', () => {
      test('POST:201, inserts new user when correct data is passed', () => {
        const userData = {
          username: 'jonny_d',
          email: 'jonny@test.com',
          password: 'super-secure',
        };
        return request(app)
          .post('/api/users')
          .send({ user: userData })
          .expect(201)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('jonny_d successfully created');
          });
      });
      test('POST:400, returns an error if error with user insert', () => {
        const userData = {
          username: null,
          email: 'jonny@test.com',
          password: 'super-secure',
        };
        return request(app)
          .post('/api/users')
          .send({ user: userData })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('invalid or missing data');
          });
      });
      test('POST:400, returns an error if error with user credentials insert', () => {
        const userData = {
          username: 'jonny_d',
          email: 'jonny@test.com',
          password: null,
        };
        return request(app)
          .post('/api/users')
          .send({ user: userData })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('invalid or missing data');
          });
      });
      test('GET:405, returns a 405 error for not allowed methods', () => {
        return request(app)
          .get('/api/users')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      test('PUT:405, returns a 405 error for not allowed methods', () => {
        return request(app)
          .put('/api/users')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      test('PATCH:405, returns a 405 error for not allowed methods', () => {
        return request(app)
          .patch('/api/users')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      test('DELETE:405, returns a 405 error for not allowed methods', () => {
        return request(app)
          .delete('/api/users')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      describe('/:userId', () => {
        const userId = '570023e2-477b-46b8-868c-c46a6fd8ffb1';
        test('GET:200, returns user data when passed a matched ID', () => {
          return request(app)
            .get(`/api/users/${userId}`)
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).toStrictEqual(usersData[0]);
            });
        });
        test('PATCH:200, updates a user email by ID', () => {
          return request(app)
            .patch(`/api/users/${userId}`)
            .send({ email: 'mynew@email.com' })
            .expect(200)
            .then(({ body: { msg } }) => {
              expect(msg).toBe(`${userId} updated`);
              return request(app)
                .get(`/api/users/${userId}`)
                .expect(200)
                .then(({ body: { user } }) => {
                  const userCopy = Object.assign({}, usersData[0]);
                  userCopy.email = 'mynew@email.com';
                  expect(user).toStrictEqual(userCopy);
                });
            });
        });
        test('PATCH:400, returns an error if email is invalid format', () => {
          return request(app)
            .patch(`/api/users/${userId}`)
            .send({ email: { a: 123 } })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('invalid or missing data');
            });
        });
        test('PATCH:404, returns an error if userId is not found', () => {
          return request(app)
            .patch('/api/users/not-uuid')
            .send({ email: 'email@me.com' })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('not found');
            });
        });
        test('DELETE:204, deletes a user by ID', () => {
          return request(app)
            .delete(`/api/users/${userId}`)
            .expect(204)
            .then(() => {
              return request(app).get(`/api/users/${userId}`).expect(404);
            });
        });
        test('DELETE: 404, returns an error if userId not found', () => {
          return request(app)
            .delete(`/api/users/not-here`)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('not found');
            });
        });
        test('PUT:405, returns a 405 error for not allowed methods', () => {
          return request(app)
            .put('/api/users/1234')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('method not allowed');
            });
        });
      });
    });
  });
});
