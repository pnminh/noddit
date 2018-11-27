import * as express from 'express';
export class StaticController {
  indexGet(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.render('static/index');
  }
}
