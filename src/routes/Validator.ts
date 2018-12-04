import { Validator, ValidationError } from 'class-validator';
import * as express from 'express';
import { Post } from '../db/entity/Post';
// Because all type information is erased in the compiled
// JavaScript, we can use this clever structural-typing
// work-around enabled by TypeScript to pass in a class
// to our middleware.
type Constructor<T> = { new (): T };
// This function returns a middleware which validates that the
// request's JSON body conforms to the passed-in type.
export function validatePosts(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  if (req.method === 'POST') {
    let validator = new Validator();
    let post = new Post(req.body.title, req.body.body, Number(req.params.topicId));
    let errors: ValidationError[] = validator.validateSync(post);
    if (errors && errors.length > 0) {
      console.log(
        JSON.stringify(
          errors.map(err => {
            return new CustomValidationError(
              err.property,
              err.constraints[Object.keys(err.constraints)[0]]
            );
          })
        )
      );
      req.flash(
        'error',
        JSON.stringify(
          errors.map(err => {
            return new CustomValidationError(
              err.property,
              err.constraints[Object.keys(err.constraints)[0]]
            );
          })
        )
      );
      res.redirect(303, <string>req.headers.referer);
    } else {
      next();
    }
  }
}
export class CustomValidationError {
  constructor(param: string, msg: string) {
    this.param = param;
    this.msg = msg;
  }
  param: string;
  msg: string;
}
