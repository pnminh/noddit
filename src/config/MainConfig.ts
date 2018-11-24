import dotenv from 'dotenv';
export class MainConfig {
  static init(): void {
    dotenv.config();
  }
}
