import { AppDataSource } from "@shared/typeorm/data-source";
import Atleta from "../typeorm/entities/Atleta";
import AppError from "@shared/errors/AppError";
import EventoTriatlon from "../../eventos/eventos/typeorm/entities/EventoTriatlon";

interface IRequest {
  nome: string;
  data_nascimento: string;
  sexo: string;
  nacionalidade: string;
  peso: number;
  altura: number;
  evento_id?: string;
}

export default class CreateAtletaService {
  public async execute({
    nome,
    data_nascimento,
    sexo,
    nacionalidade,
    peso,
    altura,
    evento_id,
  }: IRequest): Promise<Atleta> {
    const atletaRepository = AppDataSource.getRepository(Atleta);

    const atletaExists = await atletaRepository.findOne({ where: { nome } });
    if (atletaExists) {
      throw new AppError("Já existe um atleta cadastrado com este nome.");
    }

    let evento;
    if (evento_id) {
      const eventoRepository = AppDataSource.getRepository(EventoTriatlon);
      evento = await eventoRepository.findOneBy({ id: evento_id });
      if (!evento) {
        throw new AppError("Evento não encontrado.");
      }
    }

    const atleta = atletaRepository.create({
      nome,
      data_nascimento,
      sexo,
      nacionalidade,
      peso,
      altura,
      evento,
    });

    await atletaRepository.save(atleta);
    return atleta;
  }
}
