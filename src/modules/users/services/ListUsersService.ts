import { UserRepository } from "../typeorm/repositories/UserRepository";
import { User } from "../typeorm/entities/User";

export class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = new UserRepository();
    const users = await userRepository.findAll();

    return users;
  }
}
