import * as express from 'express';

import postRoutes from '../routes/PostRoute';
import staticRoutes from '../routes/StaticRoute';
import topicRoutes from '../routes/TopicRoute';
import userRoutes from '../routes/UserRoute';

export class RouteConfig {
  static init(app: express.Express) {
    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(postRoutes);
    app.use(userRoutes);
  }
}
