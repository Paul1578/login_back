import { MigrationInterface, QueryRunner } from "typeorm";

export class Restablecer1734331505676 implements MigrationInterface {
    name = 'Restablecer1734331505676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "resetToken" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetTokenExpiration" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetTokenExpiration"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetToken"`);
    }

}
