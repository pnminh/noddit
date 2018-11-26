import express from 'express';
export class TopicController {
  topicsGet(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.send('Welcome to Topic');
  }
}
