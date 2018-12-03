import {MigrationInterface, QueryRunner} from "typeorm";

export class Post1543809880662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_96496a94cfa49a06d6d802c0dea" FOREIGN KEY ("topicId") REFERENCES "topic" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "body" varchar NOT NULL, "topicId" integer)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "body", "topicId") SELECT "id", "title", "body", "topicId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
