import AppError from "@shared/errors/AppError";
import { UserRepository } from "../../users/typeorm/repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth';
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: any;
  token: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
