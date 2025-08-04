import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateServiceDTO {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Piercing de Orelha',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Descrição detalhada do serviço',
    example:
      'Piercing simples na orelha com joia de aço cirúrgico. Inclui limpeza e cuidados pós-procedimento.',
    maxLength: 500,
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({
    description: 'Preço do serviço em reais',
    example: 120.0,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number

  @ApiProperty({
    description: 'Categoria do serviço',
    example: 'Piercing',
    enum: ['Piercing', 'Tatuagem', 'Limpeza', 'Manutenção', 'Consultoria'],
  })
  @IsNotEmpty()
  @IsString()
  category: string
}
