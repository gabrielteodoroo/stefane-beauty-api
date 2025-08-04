import { ApiProperty } from '@nestjs/swagger'

export class ServiceResponseDTO {
  @ApiProperty({
    description: 'ID único do serviço',
    example: '1',
    format: 'uuid',
  })
  id: string

  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Piercing de Orelha',
    minLength: 3,
    maxLength: 100,
  })
  name: string

  @ApiProperty({
    description: 'Descrição detalhada do serviço',
    example:
      'Piercing simples na orelha com joia de aço cirúrgico. Inclui limpeza e cuidados pós-procedimento.',
    maxLength: 500,
  })
  description: string

  @ApiProperty({
    description: 'Preço do serviço em reais',
    example: 120.0,
    minimum: 0,
  })
  price: number

  @ApiProperty({
    description: 'Categoria do serviço',
    example: 'Piercing',
    enum: ['Piercing', 'Tatuagem', 'Limpeza', 'Manutenção', 'Consultoria'],
  })
  category: string
}
