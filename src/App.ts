import { RouteConfig } from './config/route-config';
import express from 'express';
class App {
  app:express.Express;
  constructor() {
    this.app = express();
    RouteConfig.init(this.app);
  }
}
export default new App().app;
