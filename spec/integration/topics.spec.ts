import StartServer from '../../src/StartServer';
import {} from 'jasmine';
import * as request from 'request';
import { createConnection } from 'typeorm';
import { Banner } from '../../src/db/entity/Banner';
import { Topic } from '../../src/db/entity/Topic';
const startServer = StartServer;
const base = `http://localhost:${process.env.PORT || 3000}/topics`;
describe('routes : topics', () => {
  beforeEach(done => {
    //this.topic:Topic;
  });
  //#1
  describe('GET /topics', () => {
    //#2
    it('should return status code 200 and all topics', done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
    fit('should run perfectly', done => {
      //#3
      createConnection().then(async connection => {
        console.log("Inserting a new user into the database...");
        const banner = new Banner();
        banner.description = "banner 1";
        banner.source = "from topic 1";
        const topic = new Topic();
        topic.title = 'topic 1';
        topic.description = "topic 1 desc";
        topic.banners = [banner];
        await connection.manager.save(topic);
        console.log("Saved a new user with id: " + banner.id);
        
        console.log("Loading topics from the database...");
        const topics = await connection.manager.find(Topic);
        console.log("Loaded topics: ", topics);
         
        console.log("Here you can setup and run express/koa/any other framework.");
        done();
    }).catch(error => {console.log(error);done();});
    });
  });
});
