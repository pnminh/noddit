import { StaticController } from '../controllers/StaticController';
import express from 'express';
const router = express.Router();
const staticController = new StaticController();
router.get('/',staticController.indexGet);
export default router;