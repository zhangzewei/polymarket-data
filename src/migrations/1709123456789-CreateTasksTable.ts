import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasksTable1709123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "is_running",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "last_run_time",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "next_run_time",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks");
    }
} 