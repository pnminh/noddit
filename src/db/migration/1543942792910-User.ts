import {MigrationInterface, QueryRunner} from "typeorm";
const env = process.env.NODE_ENV || 'development';
export class User1543942792910 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        if (env === 'production') {
            await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        }else{
            await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
