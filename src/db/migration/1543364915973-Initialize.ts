import { MigrationInterface, QueryRunner } from 'typeorm';
const env = process.env.NODE_ENV || 'development';
export class Initialize1543364915973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (env === 'production') {
      await queryRunner.query(
        `CREATE TABLE "topic" ("id" SERIAL PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`
      );
      await queryRunner.query(
        `CREATE TABLE "post" ("id" SERIAL PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic" ("id"))`
      );
    } else {
      await queryRunner.query(
        `CREATE TABLE "topic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`
      );
      await queryRunner.query(
        `CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic" ("id"))`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "banner"`);
    await queryRunner.query(`DROP TABLE "topic"`);
  }
}
