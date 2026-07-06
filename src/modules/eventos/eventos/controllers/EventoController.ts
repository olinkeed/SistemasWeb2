import { Request, Response } from "express";
import { CreateEventoService } from "../services/CreateEventoService";
import { AppDataSource } from "../../../../shared/typeorm/data-source";
import EventoTriatlon from "../typeorm/entities/EventoTriatlon";
import AppError from "@shared/errors/AppError";
export class EventoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, local, data_evento, distancia_km, categoria } = request.body;

    const createEvento = new CreateEventoService();

    const evento = await createEvento.execute({
      nome,
      local,
      data_evento,
      distancia_km,
      categoria,
    });

    return response.json(evento);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const eventosRepository = AppDataSource.getRepository(EventoTriatlon);
    const eventos = await eventosRepository.find();

    return response.json(eventos);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const eventosRepository = AppDataSource.getRepository(EventoTriatlon);
    const evento = await eventosRepository.findOneBy({ id });

    if (!evento) {
      throw new AppError("Evento not found.");
    }

    return response.json(evento);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nome, local, data_evento, distancia_km, categoria } = request.body;

    const eventosRepository = AppDataSource.getRepository(EventoTriatlon);
    let evento = await eventosRepository.findOneBy({ id });

    if (!evento) {
      throw new AppError("Evento not found.");
    }

    evento.nome = nome;
    evento.local = local;
    evento.data_evento = data_evento;
    evento.distancia_km = distancia_km;
    evento.categoria = categoria;

    await eventosRepository.save(evento);

    return response.json(evento);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const eventosRepository = AppDataSource.getRepository(EventoTriatlon);
    const evento = await eventosRepository.findOneBy({ id });

    if (!evento) {
      throw new AppError("Evento not found.");
    }

    await eventosRepository.remove(evento);

    return response.status(204).send();
  }
}
