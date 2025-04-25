import { MigrationInterface, QueryRunner } from "typeorm";

export class ResetDatabase1745489299616 implements MigrationInterface {
    name = 'ResetDatabase1745489299616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 删除所有表
        await queryRunner.query(`DROP SCHEMA public CASCADE`);
        await queryRunner.query(`CREATE SCHEMA public`);

        // 创建 migrations 表
        await queryRunner.query(`
            CREATE TABLE "migrations" (
                "id" SERIAL NOT NULL,
                "timestamp" bigint NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_migrations" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 回滚操作不需要实现，因为这是重置操作
    }
}
