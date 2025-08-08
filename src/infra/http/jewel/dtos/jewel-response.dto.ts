import { ApiProperty } from '@nestjs/swagger'

export class JewelResponseDTO {
  @ApiProperty({
    description: 'ID único da joia',
    example: '1',
    format: 'uuid',
  })
  id: string

  @ApiProperty({
    description: 'Nome da joia',
    example: 'Brincos de Prata 925',
    minLength: 3,
    maxLength: 100,
  })
  name: string

  @ApiProperty({
    description: 'Preço da joia em reais',
    example: 89.9,
    minimum: 0,
    type: 'number',
    format: 'float',
  })
  price: number

  @ApiProperty({
    description: 'Quantidade disponível em estoque',
    example: 15,
    minimum: 0,
  })
  stock: number

  @ApiProperty({
    description: 'Categoria da joia',
    example: 'Brincos',
    enum: ['Brincos', 'Anéis', 'Piercings', 'Colares', 'Pulseiras'],
  })
  category: string

  @ApiProperty({
    description: 'Material da joia',
    example: 'Prata 925',
    enum: ['Prata 925', 'Ouro 18k', 'Aço Cirúrgico', 'Titânio', 'Plástico'],
  })
  material: string

  @ApiProperty({
    description: 'URL da imagem da joia',
    example: 'https://s3.amazonaws.com/bucket/jewel-image.jpg',
    nullable: true,
    format: 'uri',
  })
  imageUrl: string | null

  @ApiProperty({
    description: 'Descrição detalhada da joia',
    example:
      'Brincos elegantes de prata 925 com pedras naturais. Perfeitos para orelhas sensíveis.',
    nullable: true,
    maxLength: 500,
  })
  description: string | null
}
