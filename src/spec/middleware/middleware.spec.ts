import sinon from 'sinon';
import httpMocks from 'node-mocks-http';

import jwt from 'jsonwebtoken';
import * as middleware from '../../middleware/middleware';

describe('#middleware', () => {
  afterEach(() => {
    sinon.restore();
  });
  afterAll(() => {
    sinon.restore();
  });
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
  describe('#checkAuth', () => {
    test('it calls next if authorization is passed and verified', () => {
      const req = httpMocks.createRequest({ headers: { authorization: 'mytoken' } });
      const res = httpMocks.createResponse({});
      const next = jest.fn();
      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({});
      });

      middleware.checkAuth(req, res, next);
      expect(next).toBeCalled();
    });
    test('it returns 401 if verify fails', () => {
      const req = httpMocks.createRequest({ headers: { authorization: 'mytoken' } });
      const res = httpMocks.createResponse({});
      const next = jest.fn();
      sinon.stub(jwt, 'verify').throws('error');

      middleware.checkAuth(req, res, next);
      expect(res.statusCode).toBe(401);
      expect(res._getData()).toStrictEqual({ auth: false, msg: 'failed to authenticate' });
    });
    test('it returns 403 if not token passed', () => {
      const req = httpMocks.createRequest({ headers: {} });
      const res = httpMocks.createResponse({});
      const next = jest.fn();

      middleware.checkAuth(req, res, next);
      expect(res.statusCode).toBe(403);
      expect(res._getData()).toStrictEqual({ auth: false, msg: 'no token provided' });
    });
  });
});
