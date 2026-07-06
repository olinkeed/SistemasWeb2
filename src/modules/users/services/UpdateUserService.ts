import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { User } from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.");
    }

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new AppError("Email address already used.");
    }

    user.name = name;
    user.email = email;
    if (password) {
      user.password = await hash(password, 8);
    }

    await userRepository.save(user);

    return user;
  }
}
