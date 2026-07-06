import { AppDataSource } from "@shared/typeorm/data-source";
import Atleta from "../typeorm/entities/Atleta";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id_atleta: string;
}

export default class ShowAtletaService {
  public async execute({ id_atleta }: IRequest): Promise<Atleta> {
    const atletaRepository = AppDataSource.getRepository(Atleta);

    const atleta = await atletaRepository.findOneBy({ id_atleta });
    if (!atleta) {
      throw new AppError("Atleta não encontrado.");
    }

    return atleta;
  }
}
