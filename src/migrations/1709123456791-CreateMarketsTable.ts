import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMarketsTable1709123456791 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "markets",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "market_id",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "event_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "question",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "condition_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "start_date",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "end_date",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "outcomes",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "outcome_prices",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "liquidity",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: true,
                        isNullable: true,
                    },
                    {
                        name: "closed",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "archived",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "featured",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "restricted",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "group_item_title",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "group_item_threshold",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "question_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_24hr",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_1wk",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_1mo",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_1yr",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "clob_token_ids",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "uma_bond",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "uma_reward",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_24hr_clob",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_1wk_clob",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_1mo_clob",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_1yr_clob",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "volume_clob",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "liquidity_clob",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "accepting_orders",
                        type: "boolean",
                        default: true,
                        isNullable: true,
                    },
                    {
                        name: "neg_risk",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "neg_risk_market_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "neg_risk_request_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "ready",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "funded",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "accepting_orders_timestamp",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "cyom",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "competitive",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "pager_duty_notification_enabled",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "approved",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "clob_rewards",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "rewards_min_size",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "rewards_max_spread",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "spread",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "one_day_price_change",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "one_hour_price_change",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "one_week_price_change",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "one_month_price_change",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "last_trade_price",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "best_bid",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "best_ask",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "automatically_active",
                        type: "boolean",
                        default: true,
                        isNullable: true,
                    },
                    {
                        name: "clear_book_on_start",
                        type: "boolean",
                        default: true,
                        isNullable: true,
                    },
                    {
                        name: "show_gmp_series",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "show_gmp_outcome",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "manual_activation",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "neg_risk_other",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "uma_resolution_statuses",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "pending_deployment",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "deploying",
                        type: "boolean",
                        default: false,
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "updated_at",
                        type: "varchar",
                        isNullable: true,
                    },
                ],
            }),
            true
        );

        // 添加外键约束
        await queryRunner.createForeignKey(
            "markets",
            new TableForeignKey({
                columnNames: ["event_id"],
                referencedColumnNames: ["event_id"],
                referencedTableName: "events",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("markets");
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("event_id") !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey("markets", foreignKey);
            }
        }
        await queryRunner.dropTable("markets");
    }
} 