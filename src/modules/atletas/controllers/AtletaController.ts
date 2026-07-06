import { NextFunction, Request, Response } from "express";
import ListAtletasService from "../services/ListAtletasService";
import ShowAtletaService from "../services/ShowAtletaService";
import CreateAtletaService from "../services/CreateAtletaService";
import UpdateAtletaService from "../services/UpdateAtletaService";
import DeleteAtletaService from "../services/DeleteAtletaService";

export default class AtletaController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const listAtletas = new ListAtletasService();
      const atletas = await listAtletas.execute();
      return response.status(200).json(atletas);
    } catch (err) {
      next(err);
    }
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id_atleta = request.params.id_atleta as string;
      const showAtleta = new ShowAtletaService();
      const atleta = await showAtleta.execute({ id_atleta });
      return response.status(200).json(atleta);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { nome, data_nascimento, sexo, nacionalidade, peso, altura, evento_id } =
        request.body;
      const createAtleta = new CreateAtletaService();
      const atleta = await createAtleta.execute({
        nome,
        data_nascimento,
        sexo,
        nacionalidade,
        peso,
        altura,
        evento_id,
      });
      return response.status(201).json(atleta);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id_atleta = request.params.id_atleta as string;
      const { nome, data_nascimento, sexo, nacionalidade, peso, altura, evento_id } =
        request.body;
      const updateAtleta = new UpdateAtletaService();
      const atleta = await updateAtleta.execute({
        id_atleta,
        nome,
        data_nascimento,
        sexo,
        nacionalidade,
        peso,
        altura,
        evento_id,
      });
      return response.status(200).json(atleta);
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id_atleta = request.params.id_atleta as string;
      const deleteAtleta = new DeleteAtletaService();
      await deleteAtleta.execute({ id_atleta });
      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
