import * as express from 'express';
export class ExpressUtils {
  static asyncMiddleware = fn => (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
