import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva Santos',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString()
  name: string

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
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string
}
