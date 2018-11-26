export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: boolean | Function;
  force: boolean;
  timezone: string;
}

const development: DatabaseConfig = {
  username: 'root',
  password: '',
  database: 'dev',
  host: 'src/db/sqlite_dbs/dev.db',
  port: 3306,
  dialect: 'sqlite',
  logging: false,
  force: true,
  timezone: '+00:00'
};
const test: DatabaseConfig = {
  username: 'root',
  password: '',
  database: 'test',
  host: 'src/db/sqlite_dbs/test.db',
  port: 3306,
  dialect: 'sqlite',
  logging: false,
  force: true,
  timezone: '+00:00'
};
export enum environment {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production'
}
export default class Configs {
  static getDatabaseConfig(env: string): DatabaseConfig {
    switch (env) {
      case environment.DEVELOPMENT.toString():
        return development;
      case environment.TEST.toString():
        return test;
      default:
        return development;
    }
  }
}
