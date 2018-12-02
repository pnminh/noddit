import { getConnection } from 'typeorm';
import * as request from 'request';

import { Topic } from '../../src/db/entity/Topic';
import StartServer from '../../src/StartServer';
import { TopicRepository } from './../../src/repositories/TopicRepository';

const startServer = StartServer;
const base = `http://localhost:${process.env.PORT || 3000}/topics`;

describe('routes : topics', () => {
  console.log('test test');
  let topicRepository = new TopicRepository();
  let topic;
  beforeEach(async () => {
    topic = await topicRepository.create(
      new Topic('JS Frameworks', 'There is a lot of them')
    );
  });
  //#1
  describe('GET /topics', () => {
    //#2
    it('should return status code 200 and all topics', async (done) => {
      let topicRetrival = await topicRepository.getAll();
      console.log(topicRetrival);
      console.log(topic);
      //#3
      request.get(base, (err, res, body) => {
        console.log(`res:${body}`);
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain('Topics');
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
});
