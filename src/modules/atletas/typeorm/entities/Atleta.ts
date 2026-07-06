import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import EventoTriatlon from "../../../eventos/eventos/typeorm/entities/EventoTriatlon";

@Entity("atletas")
class Atleta {
  @PrimaryGeneratedColumn("uuid")
  id_atleta: string;

  @Column()
  nome: string;

  @Column({ type: "date" })
  data_nascimento: Date;

  @Column({ length: 1 })
  sexo: string;

  @Column()
  nacionalidade: string;

  @Column("decimal", { precision: 5, scale: 2 })
  peso: number;

  @Column("decimal", { precision: 4, scale: 2 })
  altura: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => EventoTriatlon, evento => evento.atletas)
  @JoinColumn({ name: 'evento_id' })
  evento: EventoTriatlon;
}

export default Atleta;
