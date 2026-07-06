import "reflect-metadata";
import path from "node:path";
import { DataSource } from "typeorm";
import Atleta from "../../modules/atletas/typeorm/entities/Atleta";
import EventoTriatlon from "../../modules/eventos/eventos/typeorm/entities/EventoTriatlon";
import { User } from "../../modules/users/typeorm/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "159159",
  database: "api-atletas",
  synchronize: true,
  logging: true,
  entities: [Atleta, EventoTriatlon, User],
  migrations: [path.join(__dirname, "migrations", "*.ts"), path.join(__dirname, "..", "..", "modules", "users", "typeorm", "migrations", "*.ts"), path.join(__dirname, "..", "..", "modules", "eventos", "eventos", "typeorm", "migrations", "*.ts")],
});
