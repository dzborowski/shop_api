import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1609511861850 implements MigrationInterface {
    name = 'initMigration1609511861850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "available_copies_quantity" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "basket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "basket" ADD CONSTRAINT "FK_7563f002619986adbd5231cd45e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basket" ADD CONSTRAINT "FK_4211dd508c9a9006ae7fae086de" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basket" DROP CONSTRAINT "FK_4211dd508c9a9006ae7fae086de"`);
        await queryRunner.query(`ALTER TABLE "basket" DROP CONSTRAINT "FK_7563f002619986adbd5231cd45e"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "basket"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
