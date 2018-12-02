import { TopicRepository } from './../repositories/TopicRepository';
import * as express from 'express';
import { Topic } from '../db/entity/Topic';

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
  getData = async (): Promise<string> => {
    return Promise.resolve('Hello Topic');
  };
}
