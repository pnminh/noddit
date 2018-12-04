import {MigrationInterface, QueryRunner} from "typeorm";
const env = process.env.NODE_ENV || 'development';
export class Post1543881257477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        if (env === 'production') {
            await queryRunner.query(`CREATE TABLE "temporary_post" ("id" SERIAL PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer)`);
            await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "post"`);
            await queryRunner.query(`DROP TABLE "post"`);
            await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
            await queryRunner.query(`CREATE TABLE "temporary_post" ("id" SERIAL PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic" ("id") ON DELETE CASCADE)`);
            await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "post"`);
            await queryRunner.query(`DROP TABLE "post"`);
            await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
        }else{
            await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer)`);
            await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "post"`);
            await queryRunner.query(`DROP TABLE "post"`);
            await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
            await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic" ("id") ON DELETE CASCADE)`);
            await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "post"`);
            await queryRunner.query(`DROP TABLE "post"`);
            await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        if (env === 'production') {
            await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
            await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL PRIMARY KEY  NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer)`);
            await queryRunner.query(`INSERT INTO "post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "temporary_post"`);
            await queryRunner.query(`DROP TABLE "temporary_post"`);
            await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
            await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL PRIMARY KEY  NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
            await queryRunner.query(`INSERT INTO "post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "temporary_post"`);
            await queryRunner.query(`DROP TABLE "temporary_post"`);
        }else{
            await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
            await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer)`);
            await queryRunner.query(`INSERT INTO "post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "temporary_post"`);
            await queryRunner.query(`DROP TABLE "temporary_post"`);
            await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
            await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
            await queryRunner.query(`INSERT INTO "post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "temporary_post"`);
            await queryRunner.query(`DROP TABLE "temporary_post"`);
        }
    }

}
