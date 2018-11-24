import { MainConfig } from './config/MainConfig';
import { RouteConfig } from './config/RouteConfig';
import express from 'express';
class App {
  app:express.Express;
  constructor() {
    this.app = express();
    MainConfig.init();
    RouteConfig.init(this.app);
  }
}
export default new App().app;
