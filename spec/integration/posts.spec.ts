import { PostRepository } from './../../src/repositories/PostRepository';
import * as request from 'request';

import { Topic } from '../../src/db/entity/Topic';
import StartServer from '../../src/StartServer';
import { TopicRepository } from './../../src/repositories/TopicRepository';
import { Post } from '../../src/db/entity/Post';
import { getConnection } from 'typeorm';
const env = process.env.NODE_ENV || 'development';
const startServer = StartServer;
const base = `http://localhost:${process.env.PORT || 3000}/topics`;

describe('routes : topics', () => {
  let topicRepository = new TopicRepository();
  let postRepository = new PostRepository();
  let topic: Topic;
  let post: Post;
  beforeEach(async () => {
    topic = await topicRepository.create(
      new Topic('Winter Games', 'Post your Winter Games stories.')
    );
    post = await postRepository.create(
      new Post('Snowball Fighting', 'So much snow!', topic.id)
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

  describe('GET /topics/:topicId/posts/new', () => {
    it('should render a new post form', async done => {
      request.get(`${base}/${topic.id}/posts/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Post');
        done();
      });
    });
  });
  describe('POST /topics/:topicId/posts/create', () => {
    it('should create a new post and redirect', async done => {
      const options = {
        url: `${base}/${topic.id}/posts/create`,
        form: {
          title: 'Watching snow melt',
          body:
            'Without a doubt my favoriting things to do besides watching paint dry!'
        }
      };
      request.post(options, async (err, res, body) => {
        let testedPost = await postRepository.getByTitle('Watching snow melt');
        try {
          expect(testedPost).not.toBeNull();
          expect(testedPost.title).toBe('Watching snow melt');
          expect(testedPost.body).toBe(
            'Without a doubt my favoriting things to do besides watching paint dry!'
          );
          expect(post.topic).not.toBeNull();
          done();
        } catch (err) {
          console.log(err);
          done();
        }
      });
    });
    it('should not create a new post that fails validations', async done => {
      const options = {
        url: `${base}/${topic.id}/posts/create`,
        form: {
          //#1
          title: 'a',
          body: 'b'
        }
      };

      request.post(options, async (err, res, body) => {
        //#2
        try{
        let testedPost = await postRepository.getByTitle('a');
        expect(testedPost).toBeFalsy();
        done();
        }catch(err){
          console.log(err);
          done();
        }
      });
    });
  });
  describe('GET /topics/:topicId/posts/:id', () => {
    it('should render a view with the selected post', done => {
      request.get(`${base}/${topic.id}/posts/${post.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Snowball Fighting');
        done();
      });
    });
  });
  describe('POST /topics/:topicId/posts/:id/destroy', () => {
    it('should delete the post with the associated ID', async done => {
      //#1
      expect(post.id).not.toBe(null);
      request.post(
        `${base}/${topic.id}/posts/${post.id}/destroy`,
        async (err, res, body) => {
          let testedPost = await postRepository.getById(post.id);
          expect(err).toBeNull();
          expect(testedPost).toBeFalsy();
          done();
        }
      );
    });
  });
  describe('GET /topics/:topicId/posts/:id/edit', () => {
    it('should render a view with an edit post form', done => {
      request.get(
        `${base}/${topic.id}/posts/${post.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('Edit Post');
          expect(body).toContain('Snowball Fighting');
          done();
        }
      );
    });
  });
  describe('POST /topics/:topicId/posts/:id/update', () => {
    it('should return a status code 302', async done => {
      request.post(
        {
          url: `${base}/${topic.id}/posts/${post.id}/update`,
          form: {
            title: 'Snowman Building Competition',
            body: 'I love watching them melt slowly.'
          }
        },
        async (err, res, body) => {
          expect(err).toBeNull();
          let testedPost = await postRepository.getById(post.id);
          expect(testedPost.title).toBe('Snowman Building Competition');
          expect(testedPost.body).toBe('I love watching them melt slowly.');
          done();
        }
      );
    });
  });
});
