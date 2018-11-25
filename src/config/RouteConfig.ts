import staticRoutes from '../routes/StaticRoute';
import express from 'express';
export class RouteConfig {
  static init(app: express.Express) {
    app.use(staticRoutes);
  }
}
