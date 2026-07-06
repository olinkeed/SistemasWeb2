import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UserRepository";

interface IRequest {
  id: string;
}

export class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.");
    }

    await userRepository.remove(user);
  }
}
