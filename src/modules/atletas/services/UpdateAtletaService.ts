import { AppDataSource } from "@shared/typeorm/data-source";
import Atleta from "../typeorm/entities/Atleta";
import AppError from "@shared/errors/AppError";
import EventoTriatlon from "../../eventos/eventos/typeorm/entities/EventoTriatlon";

interface IRequest {
  id_atleta: string;
  nome: string;
  data_nascimento: string;
  sexo: string;
  nacionalidade: string;
  peso: number;
  altura: number;
  evento_id?: string;
}

export default class UpdateAtletaService {
  public async execute({
    id_atleta,
    nome,
    data_nascimento,
    sexo,
    nacionalidade,
    peso,
    altura,
    evento_id,
  }: IRequest): Promise<Atleta> {
    const atletaRepository = AppDataSource.getRepository(Atleta);

    const atleta = await atletaRepository.findOneBy({ id_atleta });
    if (!atleta) {
      throw new AppError("Atleta não encontrado.");
    }

    const atletaExists = await atletaRepository.findOne({ where: { nome } });
    if (atletaExists && atletaExists.id_atleta !== id_atleta) {
      throw new AppError("Já existe um atleta cadastrado com este nome.");
    }

    if (evento_id) {
      const eventoRepository = AppDataSource.getRepository(EventoTriatlon);
      const evento = await eventoRepository.findOneBy({ id: evento_id });
      if (!evento) {
        throw new AppError("Evento não encontrado.");
      }
      atleta.evento = evento;
    }

    atleta.nome = nome;
    atleta.data_nascimento = data_nascimento;
    atleta.sexo = sexo;
    atleta.nacionalidade = nacionalidade;
    atleta.peso = peso;
    atleta.altura = altura;

    await atletaRepository.save(atleta);
    return atleta;
  }
}
