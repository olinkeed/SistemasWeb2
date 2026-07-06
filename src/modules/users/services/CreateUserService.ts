import AppError from '@shared/errors/AppError';
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { User } from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = new UserRepository();
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
