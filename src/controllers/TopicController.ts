import * as express from 'express';

import { Topic } from '../db/entity/Topic';
import { TopicRepository } from './../repositories/TopicRepository';

export class TopicController {
  topicRepository: TopicRepository = new TopicRepository();
  topicsGet = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const topics: Topic[] = await this.topicRepository.getAll();
    res.render('topics/index', { topics });
  };
  topicsNew = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.render('topics/new');
  };
  topicsCreate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let topic = new Topic(req.body.title, req.body.description);
      topic = await this.topicRepository.create(topic);
      res.redirect(303, `topic/${topic.id}`);
    } catch (err) {
      console.log('error when creating topic', err);
      res.redirect(500, '/topics/new');
    }
  };
  topicGet = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let topicId: number = req.params.id;
      let topic = await this.topicRepository.getById(topicId, true);
      if (topic) {
        res.render('topics/show', { topic });
        return;
      }
    } catch (err) {
      console.log('error when retrieving topic', err);
    }
    res.redirect(404, '/');
    return;
  };
  topicDelete = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let topicId: number = req.params.id;
    try {
      await this.topicRepository.delete(topicId);
      res.redirect(303, '/topics');
    } catch (err) {
      console.log('error when deleting topic', err);
      res.redirect(500, `/topics/${topicId}`);
    }
  };
  topicEdit = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let topicId: number = req.params.id;
      let topic = await this.topicRepository.getById(topicId);
      if (topic) {
        res.render(`topics/edit`, { topic });
        return;
      }
    } catch (err) {
      console.log('error when retrieving topic', err);
    }
    res.redirect(404, '/');
    return;
  };
  topicUpdate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let topic = new Topic(req.body.title, req.body.description);
      topic.id = req.params.id;
      topic = await this.topicRepository.update(topic);
      res.redirect(303, `/topics/${topic.id}`);
    } catch (err) {
      console.log('error when updating topic', err);
      res.redirect(404, `/topics/${req.params.id}/edit`);
    }
  };
}
