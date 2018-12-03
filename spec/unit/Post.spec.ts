import { PostRepository } from './../../src/repositories/PostRepository';
import { Post } from './../../src/db/entity/Post';
import { Topic } from './../../src/db/entity/Topic';
import {} from 'jasmine';
import { TopicRepository } from '../../src/repositories/TopicRepository';
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
        topic
      )
    );
  });
  describe('#create()', () => {
    it('should create a post object with a title, body, and assigned topic', async done => {
      let testedPost = await postRepository.create(new Post(
        'Pros of Cryosleep during the long journey',
        "1. Not having to answer the 'are we there yet?' question.",
        topic
      ));
      expect(testedPost.title).toBe(
        'Pros of Cryosleep during the long journey'
      );
      expect(testedPost.body).toBe(
        "1. Not having to answer the 'are we there yet?' question."
      );
      expect(testedPost.topic).toBe(topic);
      done();
    });
  });
  describe('#setTopic()', () => {
    it('should associate a topic and a post together', async done => {
      expect(post.topic.id).toBe(topic.id);
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
});
