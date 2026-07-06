import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAtletas1777247300188 implements MigrationInterface {
    name = 'CreateAtletas1777247300188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "atletas" ("id_atleta" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "data_nascimento" date NOT NULL, "sexo" character varying(1) NOT NULL, "nacionalidade" character varying NOT NULL, "peso" numeric(5,2) NOT NULL, "altura" numeric(4,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_601956f820447365d3b38cd73e1" PRIMARY KEY ("id_atleta"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "atletas"`);
    }

}
