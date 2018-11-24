import staticRoutes from '../routes/static';
import express from 'express';
export class RouteConfig {
  /* constructor(app:express.Express){
        app.use(staticRoutes);
    } */
  static init(app: express.Express) {
    app.use(staticRoutes);
  }
}
