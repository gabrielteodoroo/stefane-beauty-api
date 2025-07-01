import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'
import { Either, left, right } from '@/core/errors/either/either'
import User from '../entities/user'
import { InvalidEmailError } from '@/core/errors/custom-errors/invalid-email-error'
import { UserRepository } from '../repositories/user-repository'
import Email from '@/domain/shared/email'

type Request = {
  name: string
  email: string
}

type Response = Either<NotAllowedError | InvalidEmailError, User>

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle({ email, name }: Request): Promise<Response> {
    const hasAnyUser = await this.userRepository.hasAnyUser()

    if (hasAnyUser) {
      return left(
        new NotAllowedError('Já existe um usuário cadastrado no sistema'),
      )
    }

    const emailExists = await this.userRepository.findByEmail(email)

    if (emailExists) {
      return left(new NotAllowedError('Email já está em uso'))
    }

    const userEmail = Email.create(email)

    if (!userEmail.validate()) {
      return left(new InvalidEmailError())
    }

    const user = User.create({ name, email: userEmail })

    await this.userRepository.create(user)

    return right(user)
  }
}
