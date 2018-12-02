import { Connection, createConnection } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
export class RepositoryConfig {
  private static connection: Connection;
  static async setup(): Promise<Connection> {
    if (!RepositoryConfig.connection) {
      this.connection = await createConnection(env);
    }
    return this.connection;
  }
}
