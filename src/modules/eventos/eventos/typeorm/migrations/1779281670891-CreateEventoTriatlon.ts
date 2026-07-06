import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEventoTriatlon1779281670891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "eventos_triatlon",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "local",
            type: "varchar",
          },
          {
            name: "data_evento",
            type: "date",
          },
          {
            name: "distancia_km",
            type: "decimal",
            precision: 5,
            scale: 2,
          },
          {
            name: "categoria",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("eventos_triatlon");
  }
}
