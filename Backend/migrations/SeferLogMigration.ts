import { MigrationInterface, QueryRunner } from "typeorm";

export class SeferLogMigration1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE sefer_log (
                id SERIAL PRIMARY KEY,
                sefer_id INTEGER REFERENCES sefer(id) ON DELETE CASCADE,
                tarih TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                tahmini_sure INTEGER,
                trafik_durumu TEXT
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE sefer_log`);
    }
}
