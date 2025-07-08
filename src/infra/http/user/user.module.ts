import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/create-user.controller'
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user'
import { UserRepository } from '@/domain/user/repositories/user-repository'
import { CryptoModule } from '@/infra/crypto/crypto.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { HashRepository } from '@/domain/user/services/hash-repository'
import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user'
import { TokenRepository } from '@/domain/user/services/token-repository'
import { LoginController } from './controllers/login.controller'

@Module({
  imports: [CryptoModule, DatabaseModule],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashRepository: HashRepository,
      ) => {
        return new CreateUserUseCase(userRepository, hashRepository)
      },
      inject: [UserRepository, HashRepository],
    },
    {
      provide: AuthUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashRepository: HashRepository,
        tokenRepository: TokenRepository,
      ) => {
        return new AuthUserUseCase(
          userRepository,
          tokenRepository,
          hashRepository,
        )
      },
      inject: [UserRepository, HashRepository, TokenRepository],
    },
  ],
  controllers: [CreateUserController, LoginController],
})
export class UserModule {}
