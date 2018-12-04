import { Topic } from './../db/entity/Topic';
import { TopicRepository } from './../repositories/TopicRepository';
import * as express from 'express';

import { Post } from '../db/entity/Post';
import { PostRepository } from './../repositories/PostRepository';

export class PostController {
  postRepository: PostRepository = new PostRepository();
  topicRepository: TopicRepository = new TopicRepository();
  postsGet = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const posts: Post[] = await this.postRepository.getAll();
    res.render('posts/index', { posts: posts, topicId: req.params.topicId });
  };
  postGet = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let postId: number = req.params.id;
      let post = await this.postRepository.getById(postId);
      if (post) {
        res.render('posts/show', { post: post, topicId: req.params.topicId });
        return;
      }
    } catch (err) {
      console.log('error when retrieving post', err);
    }
    res.redirect(404, '/');
    return;
  };
  postNew = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.render('posts/new', { topicId: req.params.topicId });
  };
  postCreate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let topic: Topic = await this.topicRepository.getById(req.params.topicId);
      if (topic) {
        let post = new Post(req.body.title, req.body.body, topic);
        post = await this.postRepository.create(post);
        res.redirect(303, `/topics/${req.params.topicId}/posts/${post.id}`);
        return;
      }
      res.redirect(404, `/topics/${req.params.topicId}/posts/new`);
    } catch (err) {
      console.log('error when creating post', err);
      res.redirect(500, `/topics/${req.params.topicId}/posts/new`);
    }
  };
  postDelete = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await this.postRepository.delete(req.params.id);
      res.redirect(303, `/topics/${req.params.topicId}`);
    } catch (err) {
      console.log('error when deleting topic', err);
      res.redirect(500, `/topics/${req.params.topicId}`);
    }
  };
  postEdit = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let post = await this.postRepository.getById(req.params.id);
      if (post) {
          res.render(`posts/edit`, { post: post, topicId: req.params.topicId });
        return;
      }
    } catch (err) {
      console.log('error when retrieving post', err);
    }
    res.redirect(404, '/');
    return;
  };
  postUpdate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let post = new Post(req.body.title, req.body.body);
      post.id = req.params.id;
      post = await this.postRepository.update(post);
      res.redirect(`/topics/${req.params.topicId}/posts/${post.id}`);
    } catch (err) {
      console.log('error when updating post', err);
      res.redirect(
        404,
        `/topics/${req.params.topicId}/posts/${req.params.id}/edit`
      );
    }
  };
}
