import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { User } from "../typeorm/entities/User";

interface IRequest {
  id: string;
}

export class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.");
    }

    return user;
  }
}
