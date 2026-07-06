import { AppError } from "../../../../shared/errors/AppError";
import { AppDataSource } from "../../../../shared/typeorm/data-source";
import EventoTriatlon from "../typeorm/entities/EventoTriatlon";

interface IRequest {
  nome: string;
  local: string;
  data_evento: Date;
  distancia_km: number;
  categoria: string;
}

export class CreateEventoService {
  public async execute({ nome, local, data_evento, distancia_km, categoria }: IRequest): Promise<EventoTriatlon> {
    const eventosRepository = AppDataSource.getRepository(EventoTriatlon);
    const eventoExists = await eventosRepository.findOneBy({ nome });

    if (eventoExists) {
      throw new AppError("There is already an event with this name");
    }

    const evento = eventosRepository.create({
      nome,
      local,
      data_evento,
      distancia_km,
      categoria,
    });

    await eventosRepository.save(evento);

    return evento;
  }
}
