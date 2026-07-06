import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../../../../shared/typeorm/data-source";

export class UserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async create(data: Partial<User>): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}
