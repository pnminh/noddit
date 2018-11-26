import StartServer from '../../src/StartServer';
import {} from 'jasmine';
import request from 'request';
const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const startServer = StartServer;
const base = `http://localhost:${process.env.PORT || 3000}/topics`;
describe('routes : topics', () => {
  beforeEach(done => {
    //this.topic:Topic;
    sequelize.sync({ force: true }).then(res => {
      Topic.create({
        title: 'JS Frameworks',
        description: 'There is a lot of them'
      })
        .then(topic => {
          this.topic = topic;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  //#1
  describe('GET /topics', () => {
    //#2
    it('should return status code 200 and all topics', done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain('Topics');
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
});
