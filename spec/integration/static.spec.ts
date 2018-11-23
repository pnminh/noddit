import {Server} from './../../src/Server';
import {} from 'jasmine';
import request from 'request';
const base = 'http://localhost:3000';
new Server();
describe('test', () => {
  it('test', (done) => {
    request.get(base,(err:any,res:request.Response,body:any)=>{
        expect(res.statusCode).toBe(200);
        done();
    })
  });
});
