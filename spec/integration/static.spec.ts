import { Server } from './../../src/Server';
import {} from 'jasmine';
import request from 'request';
const base = 'http://localhost:3000';
new Server();
describe('routes : static', () => {
  //#1
  describe('GET /', () => {
    //#2
    it('should return status code 200', done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toContain('Hello World');
        //#4
        done();
      });
    });
  });
});
