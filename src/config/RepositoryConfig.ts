import { Connection, createConnection } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
export class RepositoryConfig {
  static setup(): Promise<Connection> {
    return createConnection(env);
  }
}
