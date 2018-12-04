import { getConnection } from 'typeorm';
import { PostRepository } from './../../src/repositories/PostRepository';
import { Post } from './../../src/db/entity/Post';
import { Topic } from './../../src/db/entity/Topic';
import {} from 'jasmine';
import { TopicRepository } from '../../src/repositories/TopicRepository';
const env = process.env.NODE_ENV || 'development';
describe('Post', () => {
  let topic: Topic;
  let post: Post;
  let topicRepository = new TopicRepository();
  let postRepository = new PostRepository();
  beforeEach(async () => {
    topic = await topicRepository.create(
      new Topic(
        'Expeditions to Alpha Centauri',
        'A compilation of reports from recent visits to the star system.'
      )
    );
    post = await postRepository.create(
      new Post(
        'My first visit to Proxima Centauri b',
        'I saw some rocks.',
        topic.id
      )
    );
  });
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
    it('should create a post object with a title, body, and assigned topic', async done => {
      let testedPost = await postRepository.create(
        new Post(
          'Pros of Cryosleep during the long journey',
          "1. Not having to answer the 'are we there yet?' question.",
          topic.id
        )
      );
      expect(testedPost.title).toBe(
        'Pros of Cryosleep during the long journey'
      );
      expect(testedPost.body).toBe(
        "1. Not having to answer the 'are we there yet?' question."
      );
      expect(testedPost.topicId).toBe(topic.id);
      done();
    });
  });
  describe('#setTopic()', () => {
    it('should associate a topic and a post together', async done => {
      expect(post.topicId).toBe(topic.id);
      let newTopic = await topicRepository.create(
        new Topic(
          'Challenges of interstellar travel',
          '1. The Wi-Fi is terrible'
        )
      );
      post.topic = newTopic;
      post = await postRepository.save(post);
      expect(post.topic.id).toBe(newTopic.id);
      done();
    });
  });
  describe('#getTopic()', () => {
    it('sshould retrieve Topic with Post', async done => {
      let testedPost = await postRepository.getById(post.id);
      expect(testedPost.topic).toEqual(topic);
      done();
    });
  });
  describe('#getPostByTopicId()', () => {
    it('should find Posts by topicId', async done => {
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
      let testedPosts = await postRepository.getByTopicId(testTopic.id);
      expect(testedPosts.length).toBe(2);
      done();
    });
  });
});
