import StartServer from '../../src/StartServer';
import {} from 'jasmine';
import request from 'request';
const base = `http://localhost:${process.env.PORT||3000}`;
const startServer = StartServer;
describe('routes : static', () => {
  //#1
  describe('GET /', () => {
    //#2
    it('should return status code 200', done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toContain('Welcome');
        //#4
        done();
      });
    });
  });
});
