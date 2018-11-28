import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1543364915973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "banner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "source" varchar NOT NULL, "description" varchar NOT NULL, "topicId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_banner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "source" varchar NOT NULL, "description" varchar NOT NULL, "topicId" integer, CONSTRAINT "FK_218d44aa86e285ebd6a2f34950b" FOREIGN KEY ("topicId") REFERENCES "topic" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_banner"("id", "source", "description", "topicId") SELECT "id", "source", "description", "topicId" FROM "banner"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`ALTER TABLE "temporary_banner" RENAME TO "banner"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "banner" RENAME TO "temporary_banner"`);
        await queryRunner.query(`CREATE TABLE "banner" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "source" varchar NOT NULL, "description" varchar NOT NULL, "topicId" integer)`);
        await queryRunner.query(`INSERT INTO "banner"("id", "source", "description", "topicId") SELECT "id", "source", "description", "topicId" FROM "temporary_banner"`);
        await queryRunner.query(`DROP TABLE "temporary_banner"`);
        await queryRunner.query(`DROP TABLE "banner"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
