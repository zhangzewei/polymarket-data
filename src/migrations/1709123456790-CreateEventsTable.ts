import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEventsTable1709123456790 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "events",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "event_id",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "ticker",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "text",
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
                        name: "creation_date",
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
                        name: "competitive",
                        type: "varchar",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("events");
    }
} 