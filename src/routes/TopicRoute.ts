import * as express from 'express';

import { TopicController } from './../controllers/TopicController';

const router = express.Router();
const topicController = new TopicController();
router.get('/topics', topicController.topicsGet);
export default router;
