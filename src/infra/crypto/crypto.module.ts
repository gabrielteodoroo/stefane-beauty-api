import { HashRepository } from '@/domain/user/services/hash-repository'
import { Module } from '@nestjs/common'
import { HashService } from './hash.service'
import { TokenRepository } from '@/domain/user/services/token-repository'
import { JwtToken } from './jwt.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [
    { provide: HashRepository, useClass: HashService },
    { provide: TokenRepository, useClass: JwtToken },
  ],
  exports: [HashRepository, TokenRepository],
})
export class CryptoModule {}
