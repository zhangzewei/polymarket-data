import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDateFieldsToString1709123456792 implements MigrationInterface {
    name = 'UpdateDateFieldsToString1709123456792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 修改 events 表中的时间字段
        await queryRunner.query(`
            ALTER TABLE "events" 
            ALTER COLUMN "start_date" TYPE varchar,
            ALTER COLUMN "end_date" TYPE varchar,
            ALTER COLUMN "creation_date" TYPE varchar,
            ALTER COLUMN "created_at" TYPE varchar,
            ALTER COLUMN "updated_at" TYPE varchar
        `);

        // 修改 markets 表中的时间字段
        await queryRunner.query(`
            ALTER TABLE "markets" 
            ALTER COLUMN "start_date" TYPE varchar,
            ALTER COLUMN "end_date" TYPE varchar,
            ALTER COLUMN "accepting_orders_timestamp" TYPE varchar,
            ALTER COLUMN "created_at" TYPE varchar,
            ALTER COLUMN "updated_at" TYPE varchar
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 回滚操作 - 将字段改回 timestamp
        await queryRunner.query(`
            ALTER TABLE "events" 
            ALTER COLUMN "start_date" TYPE timestamp,
            ALTER COLUMN "end_date" TYPE timestamp,
            ALTER COLUMN "creation_date" TYPE timestamp,
            ALTER COLUMN "created_at" TYPE timestamp,
            ALTER COLUMN "updated_at" TYPE timestamp
        `);

        await queryRunner.query(`
            ALTER TABLE "markets" 
            ALTER COLUMN "start_date" TYPE timestamp,
            ALTER COLUMN "end_date" TYPE timestamp,
            ALTER COLUMN "accepting_orders_timestamp" TYPE timestamp,
            ALTER COLUMN "created_at" TYPE timestamp,
            ALTER COLUMN "updated_at" TYPE timestamp
        `);
    }
} 