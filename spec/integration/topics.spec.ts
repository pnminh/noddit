import * as request from 'request';

import { Topic } from '../../src/db/entity/Topic';
import StartServer from '../../src/StartServer';
import { TopicRepository } from './../../src/repositories/TopicRepository';

const startServer = StartServer;
const base = `http://localhost:${process.env.PORT || 3000}/topics`;

describe('routes : topics', () => {
  console.log('test test');
  let topicRepository = new TopicRepository();
  let topic: Topic;
  beforeEach(async () => {
    topic = await topicRepository.create(
      new Topic('JS Frameworks', 'There is a lot of them')
    );
  });
  afterEach(async () => {
    await topicRepository.delete(topic.id);
  });
  //#1
  describe('GET /topics', () => {
    //#2
    it('should return status code 200 and all topics', async done => {
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
  describe('GET /topics/new', () => {
    it('should render new topic form', async done => {
      request.get(`${base}/new`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain('New Topic');
        done();
      });
    });
  });
  describe('POST /topics/create', () => {
    const options: request.Options = {
      url: `${base}/create`,
      form: {
        title: 'blink-182 songs',
        description: "What's your favorite blink-182 song?"
      }
    };
    it('should create a new topic and redirect', async done => {
      request.post(options, async (err, res, body) => {
        try {
          let createdTopic = await topicRepository.getByTitle(
            'blink-182 songs'
          );
          expect(res.statusCode).toBe(303);
          expect(createdTopic.title).toBe('blink-182 songs');
          expect(createdTopic.description).toBe(
            "What's your favorite blink-182 song?"
          );
          await topicRepository.delete(createdTopic.id);
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      });
    });
  });
  describe('GET /topics/:id', () => {
    it('should show selected topic', async done => {
      request.get(`${base}/${topic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
  describe('POST /topics/:id/destroy', () => {
    it('should delete the topic with the associated ID', async done => {
      let topics: Topic[] = await topicRepository.getAll();
      const topicCountBeforeDelete = topics.length;
      request.post(`${base}/${topic.id}/destroy`, async (err, res, body) => {
        topics = await topicRepository.getAll();
        expect(topics.length).toBe(topicCountBeforeDelete - 1);
        done();
      });
    });
  });
  describe('GET /topics/:id/edit', () => {
    it('should show form to edit topic', async done => {
      request.get(`${base}/${topic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Edit Topic');
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
  describe('POST /topics/:id/update', () => {
    it('should update the topic with the given values', async done => {
      const options: request.Options = {
        url: `${base}/${topic.id}/update`,
        form: {
          title: 'JavaScript Frameworks',
          description: 'There are a lot of them'
        }
      };
      request.post(options, async (err, res, body) => {
        try {
          let topicAfterUpdate = await topicRepository.getById(topic.id);
          expect(res.statusCode).toBe(303);
          expect(topicAfterUpdate.title).toBe('JavaScript Frameworks');
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      });
    });
  });
});
