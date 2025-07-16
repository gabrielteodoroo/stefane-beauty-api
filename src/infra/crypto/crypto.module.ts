import { HashRepository } from '@/domain/user/services/hash-repository'
import { Module } from '@nestjs/common'
import { HashService } from './hash.service'
import { TokenRepository } from '@/domain/user/services/token-repository'
import { JwtToken } from './jwt.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_TOKEN'),
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    { provide: HashRepository, useClass: HashService },
    { provide: TokenRepository, useClass: JwtToken },
  ],
  exports: [HashRepository, TokenRepository],
})
export class CryptoModule {}
