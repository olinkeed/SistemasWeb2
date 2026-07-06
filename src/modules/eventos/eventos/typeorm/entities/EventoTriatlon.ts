import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import Atleta from "../../../../atletas/typeorm/entities/Atleta";

@Entity("eventos_triatlon")
class EventoTriatlon {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  local: string;

  @Column({ type: "date" })
  data_evento: Date;

  @Column("decimal", { precision: 5, scale: 2 })
  distancia_km: number;

  @Column()
  categoria: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Atleta, atleta => atleta.evento)
  atletas: Atleta[];
}

export default EventoTriatlon;
