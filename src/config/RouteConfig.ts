import staticRoutes from '../routes/StaticRoute';
import topicRoutes from '../routes/TopicRoute';
import postRoutes from '../routes/PostRoute';
import * as express from 'express';
export class RouteConfig {
  static init(app: express.Express) {
    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
  }
}
