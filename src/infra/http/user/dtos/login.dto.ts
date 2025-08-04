import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDTO {
  @ApiProperty({
    description: 'Email válido do usuário',
    example: 'joao.silva@email.com',
    format: 'email',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6,
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string
}
