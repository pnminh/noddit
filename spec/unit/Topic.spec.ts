import { PostRepository } from './../../src/repositories/PostRepository';
import { Post } from './../../src/db/entity/Post';
import { Topic } from './../../src/db/entity/Topic';
import {} from 'jasmine';
import { TopicRepository } from '../../src/repositories/TopicRepository';
import { getConnection } from 'typeorm';
const env = process.env.NODE_ENV || 'development';
describe('Post', () => {
  let topic: Topic;
  let posts: Post[];
  let post: Post;
  let topicRepository = new TopicRepository();
  let postRepository = new PostRepository();
  afterAll(async () => {
    await getConnection(env)
      .getRepository(Post)
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id is not null')
      .execute();
      await getConnection(env)
      .getRepository(Topic)
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id is not null')
      .execute();
  });
  describe('#create()', () => {
    it('should create a topic', async done => {
      //typeorm does not support persistence of many sides
      //reference: https://github.com/typeorm/typeorm/issues/1167

      let testTopic = await topicRepository.create(
        new Topic(
          'Expeditions to Alpha Centauri',
          'A compilation of reports from recent visits to the star system.'
        )
      );
      expect(testTopic.title).toBe('Expeditions to Alpha Centauri');
      expect(testTopic.description).toBe(
        'A compilation of reports from recent visits to the star system.'
      );
      done();
    });
  });
  describe('#getTopic()', () => {
    it('should retrieve topic with posts for eager loading', async done => {
      let testTopic = await topicRepository.create(
        new Topic(
          'Expeditions to Alpha Centauri',
          'A compilation of reports from recent visits to the star system.'
        )
      );
      await postRepository.create(
        new Post(
          'My first visit to Proxima Centauri b',
          'I saw some rocks.',
          testTopic.id
        )
      );
      await postRepository.create(
        new Post('My 2nd visit to the Centauri', 'I saw aliens', testTopic.id)
      );
      testTopic = await topicRepository.getById(testTopic.id,true);
      expect(testTopic.posts.length).toBe(2);
      expect(testTopic.posts[1].id).toBeTruthy();
      done();
    });
    it('should retrieve topic with no post when lazy loading', async done => {
      let testTopic = await topicRepository.create(
        new Topic(
          'Expeditions to Alpha Centauri',
          'A compilation of reports from recent visits to the star system.'
        )
      );
      await postRepository.create(
        new Post(
          'My first visit to Proxima Centauri b',
          'I saw some rocks.',
          testTopic.id
        )
      );
    
      testTopic = await topicRepository.getById(testTopic.id);
      expect(testTopic.posts).toBeFalsy();
      done();
    });
  });
});
