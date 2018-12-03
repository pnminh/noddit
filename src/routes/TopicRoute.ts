import { ExpressUtils } from './../utils/ExpressUtils';
import * as express from 'express';

import { TopicController } from './../controllers/TopicController';
const router = express.Router();
const topicController = new TopicController();
//asyncMiddleware helps to resolve result and catch error for promise
//reference: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
router.get('/topics', ExpressUtils.asyncMiddleware(topicController.topicsGet));
router.get(
  '/topics/new',
  ExpressUtils.asyncMiddleware(topicController.topicsNew)
);
router.post(
  '/topics/create',
  ExpressUtils.asyncMiddleware(topicController.topicsCreate)
);
router.get(
  '/topics/:id',
  ExpressUtils.asyncMiddleware(topicController.topicGet)
);
router.post(
  '/topics/:id/destroy',
  ExpressUtils.asyncMiddleware(topicController.topicDelete)
);
router.get(
  '/topics/:id/edit',
  ExpressUtils.asyncMiddleware(topicController.topicEdit)
);
router.post(
  '/topics/:id/update',
  ExpressUtils.asyncMiddleware(topicController.topicUpdate)
);
export default router;
