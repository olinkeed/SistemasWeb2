import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";
import { ShowUserService } from "../services/ShowUserService";
import { UpdateUserService } from "../services/UpdateUserService";
import { DeleteUserService } from "../services/DeleteUserService";

export class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = new ShowUserService();
    const user = await showUserService.execute({ id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({
      id,
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute({ id });

    return response.status(204).send();
  }
}
