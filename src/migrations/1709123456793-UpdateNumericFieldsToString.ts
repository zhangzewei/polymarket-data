import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNumericFieldsToString1709123456793 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 修改 events 表中的数值字段
        await queryRunner.query(`
            ALTER TABLE "events" 
            ALTER COLUMN "liquidity" TYPE varchar,
            ALTER COLUMN "volume" TYPE varchar,
            ALTER COLUMN "volume_24hr" TYPE varchar,
            ALTER COLUMN "volume_1wk" TYPE varchar,
            ALTER COLUMN "volume_1mo" TYPE varchar,
            ALTER COLUMN "volume_1yr" TYPE varchar,
            ALTER COLUMN "competitive" TYPE varchar
        `);

        // 修改 markets 表中的数值字段
        await queryRunner.query(`
            ALTER TABLE "markets" 
            ALTER COLUMN "liquidity" TYPE varchar,
            ALTER COLUMN "volume" TYPE varchar,
            ALTER COLUMN "volume_24hr" TYPE varchar,
            ALTER COLUMN "volume_1wk" TYPE varchar,
            ALTER COLUMN "volume_1mo" TYPE varchar,
            ALTER COLUMN "volume_1yr" TYPE varchar,
            ALTER COLUMN "volume_24hr_clob" TYPE varchar,
            ALTER COLUMN "volume_1wk_clob" TYPE varchar,
            ALTER COLUMN "volume_1mo_clob" TYPE varchar,
            ALTER COLUMN "volume_1yr_clob" TYPE varchar,
            ALTER COLUMN "volume_clob" TYPE varchar,
            ALTER COLUMN "liquidity_clob" TYPE varchar,
            ALTER COLUMN "competitive" TYPE varchar,
            ALTER COLUMN "rewards_min_size" TYPE varchar,
            ALTER COLUMN "rewards_max_spread" TYPE varchar,
            ALTER COLUMN "spread" TYPE varchar,
            ALTER COLUMN "one_day_price_change" TYPE varchar,
            ALTER COLUMN "one_hour_price_change" TYPE varchar,
            ALTER COLUMN "one_week_price_change" TYPE varchar,
            ALTER COLUMN "one_month_price_change" TYPE varchar,
            ALTER COLUMN "last_trade_price" TYPE varchar,
            ALTER COLUMN "best_bid" TYPE varchar,
            ALTER COLUMN "best_ask" TYPE varchar
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 回滚 markets 表中的字段类型
        await queryRunner.query(`
            ALTER TABLE "markets" 
            ALTER COLUMN "liquidity" TYPE decimal(20,8),
            ALTER COLUMN "volume" TYPE decimal(20,8),
            ALTER COLUMN "volume_24hr" TYPE decimal(20,8),
            ALTER COLUMN "volume_1wk" TYPE decimal(20,8),
            ALTER COLUMN "volume_1mo" TYPE decimal(20,8),
            ALTER COLUMN "volume_1yr" TYPE decimal(20,8),
            ALTER COLUMN "volume_24hr_clob" TYPE decimal(20,8),
            ALTER COLUMN "volume_1wk_clob" TYPE decimal(20,8),
            ALTER COLUMN "volume_1mo_clob" TYPE decimal(20,8),
            ALTER COLUMN "volume_1yr_clob" TYPE decimal(20,8),
            ALTER COLUMN "volume_clob" TYPE decimal(20,8),
            ALTER COLUMN "liquidity_clob" TYPE decimal(20,8),
            ALTER COLUMN "competitive" TYPE decimal(10,8),
            ALTER COLUMN "rewards_min_size" TYPE decimal(10,8),
            ALTER COLUMN "rewards_max_spread" TYPE decimal(10,2),
            ALTER COLUMN "spread" TYPE decimal(10,8),
            ALTER COLUMN "one_day_price_change" TYPE decimal(10,8),
            ALTER COLUMN "one_hour_price_change" TYPE decimal(10,8),
            ALTER COLUMN "one_week_price_change" TYPE decimal(10,8),
            ALTER COLUMN "one_month_price_change" TYPE decimal(10,8),
            ALTER COLUMN "last_trade_price" TYPE decimal(10,8),
            ALTER COLUMN "best_bid" TYPE decimal(10,8),
            ALTER COLUMN "best_ask" TYPE decimal(10,8)
        `);

        // 回滚 events 表中的字段类型
        await queryRunner.query(`
            ALTER TABLE "events" 
            ALTER COLUMN "liquidity" TYPE decimal(20,8),
            ALTER COLUMN "volume" TYPE decimal(20,8),
            ALTER COLUMN "volume_24hr" TYPE decimal(20,8),
            ALTER COLUMN "volume_1wk" TYPE decimal(20,8),
            ALTER COLUMN "volume_1mo" TYPE decimal(20,8),
            ALTER COLUMN "volume_1yr" TYPE decimal(20,8),
            ALTER COLUMN "competitive" TYPE decimal(10,8)
        `);
    }
} 