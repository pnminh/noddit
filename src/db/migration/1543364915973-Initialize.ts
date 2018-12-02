import { MigrationInterface, QueryRunner } from 'typeorm';
const env = process.env.NODE_ENV || 'development';
export class Initialize1543364915973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (env === 'production') {
      await queryRunner.query(
        `CREATE TABLE "topic" ("id" SERIAL PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`
      );
      await queryRunner.query(
        `CREATE TABLE "banner" ("id" SERIAL PRIMARY KEY NOT NULL, "source" varchar NOT NULL, "description" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_218d44aa86e285ebd6a2f34950b" FOREIGN KEY ("topicId") REFERENCES "topic" ("id"))`
      );
    }else{
        await queryRunner.query(
            `CREATE TABLE "topic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`
          );
          await queryRunner.query(
            `CREATE TABLE "banner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "source" varchar NOT NULL, "description" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_218d44aa86e285ebd6a2f34950b" FOREIGN KEY ("topicId") REFERENCES "topic" ("id"))`
          );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "banner"`);
    await queryRunner.query(`DROP TABLE "topic"`);
  }
}
