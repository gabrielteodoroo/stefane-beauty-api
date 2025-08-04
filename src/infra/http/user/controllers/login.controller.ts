import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user'
import { UserPresenter } from '@/infra/presenters/user-presenter'
import { LoginDTO } from '../dtos/login.dto'
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('/login')
@Public()
export class LoginController {
  constructor(private readonly authUser: AuthUserUseCase) {}

  @ApiOperation({
    summary: 'Fazer login',
    description:
      'Autentica um usuário e retorna um token JWT para acesso aos endpoints protegidos',
  })
  @ApiBody({
    type: LoginDTO,
    description: 'Credenciais do usuário (email e senha)',
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'Token JWT para autenticação',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        },
        user: {
          type: 'object',
          description: 'Dados do usuário autenticado',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do usuário',
              example: '1',
            },
            name: {
              type: 'string',
              description: 'Nome do usuário',
              example: 'João Silva Santos',
            },
            email: {
              type: 'string',
              description: 'Email do usuário',
              example: 'joao.silva@email.com',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas - Email ou senha incorretos',
  })
  @Post()
  @HttpCode(200)
  async handle(@Body() body: LoginDTO) {
    const { email, password } = body

    const response = await this.authUser.handle({ email, password })

    if (response.isLeft()) {
      throw new UnauthorizedException(response.value.message)
    }

    const { user, token } = response.value

    return {
      token,
      user: UserPresenter.toHTTP(user),
    }
  }
}
