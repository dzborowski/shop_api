import {MigrationInterface, QueryRunner} from "typeorm";

export class User1549398374584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
        "CREATE TABLE \"user\" (\"id\" SERIAL NOT NULL, \"firstName\" character varying(255) NOT NULL, \"lastName\" character varying(255) NOT NULL, \"email\" character varying(255) NOT NULL, \"password\" character varying(255) NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE \"user\"");
  }
}
