import { ExpressUtils } from './../utils/ExpressUtils';
import * as express from 'express';

import { PostController } from './../controllers/PostController';
const router = express.Router();
const postController = new PostController();
//asyncMiddleware helps to resolve result and catch error for promise
//reference: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
router.get('/posts', ExpressUtils.asyncMiddleware(postController.postsGet));
router.get(
  '/topics/:topicId/posts/new',
  ExpressUtils.asyncMiddleware(postController.postNew)
);
router.post(
  '/topics/:topicId/posts/create',
  ExpressUtils.asyncMiddleware(postController.postCreate)
);
router.get(
  '/topics/:topicId/posts/:id',
  ExpressUtils.asyncMiddleware(postController.postGet)
);
router.post(
  '/topics/:topicId/posts/:id/destroy',
  ExpressUtils.asyncMiddleware(postController.postDelete)
);
router.get(
  '/topics/:topicId/posts/:id/edit',
  ExpressUtils.asyncMiddleware(postController.postEdit)
);
router.post(
  '/topics/:topicId/posts/:id/update',
  ExpressUtils.asyncMiddleware(postController.postUpdate)
);
export default router;
