import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddEventoIdToAtleta1779281670892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "atletas",
      new TableColumn({
        name: "evento_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "atletas",
      new TableForeignKey({
        name: "EventoAtleta",
        columnNames: ["evento_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "eventos_triatlon",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("atletas", "EventoAtleta");
    await queryRunner.dropColumn("atletas", "evento_id");
  }
}
