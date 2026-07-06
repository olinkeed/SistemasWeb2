import { AppDataSource } from "@shared/typeorm/data-source";
import Atleta from "../typeorm/entities/Atleta";

export default class ListAtletasService {
  public async execute(): Promise<Atleta[]> {
    const atletaRepository = AppDataSource.getRepository(Atleta);
    const atletas = await atletaRepository.find();
    return atletas;
  }
}
