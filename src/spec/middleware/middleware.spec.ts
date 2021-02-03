import httpMocks from 'node-mocks-http';
import * as middleware from '../../middleware/middleware';

describe('#middleware', () => {
  describe('#methodNotAllowedResponder', () => {
    test('it returns status 405 with msg in response body', () => {
      const req = httpMocks.createRequest({});
      const res = httpMocks.createResponse({});
      const next = jest.fn();
      const result = middleware.methodNotAllowedResponder(req, res, next);
      expect(res.statusCode).toBe(405);
      expect(res._getData()).toStrictEqual({ msg: 'method not allowed' });
    });
  });
});
