import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMarketPriceHistoriesTable1709123456794 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "market_price_histories",
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
                        isNullable: false,
                    },
                    {
                        name: "best_bid",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "best_ask",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        // 添加外键约束
        await queryRunner.createForeignKey(
            "market_price_histories",
            new TableForeignKey({
                columnNames: ["market_id"],
                referencedColumnNames: ["market_id"],
                referencedTableName: "markets",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("market_price_histories");
        if (table) {
            const foreignKeys = table.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey("market_price_histories", foreignKey);
            }
        }
        await queryRunner.dropTable("market_price_histories");
    }
} 