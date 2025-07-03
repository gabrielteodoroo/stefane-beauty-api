import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error';
import { Either, left, right } from '@/core/errors/either/either';
import User from '../entities/user';
import { InvalidEmailError } from '@/core/errors/custom-errors/invalid-email-error';
import { UserRepository } from '../repositories/user-repository';
import Email from '@/domain/shared/email';
import { HashRepository } from '../services/hash-repository';

type Request = {
  name: string;
  email: string;
  password: string;
};

type Response = Either<NotAllowedError | InvalidEmailError, User>;

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashRepository: HashRepository,
  ) {}

  async handle({ email, name, password }: Request): Promise<Response> {
    const hasAnyUser = await this.userRepository.hasAnyUser();

    if (hasAnyUser) {
      return left(
        new NotAllowedError('Já existe um usuário cadastrado no sistema'),
      );
    }

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      return left(new NotAllowedError('Email já está em uso'));
    }

    const userEmail = Email.create(email);

    if (!userEmail.validate()) {
      return left(new InvalidEmailError());
    }

    const passwordUser = await this.hashRepository.hash(password);

    const user = User.create({
      name,
      email: userEmail,
      password: passwordUser,
    });

    await this.userRepository.create(user);

    return right(user);
  }
}
