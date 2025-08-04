import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateJewelDTO {
  @ApiProperty({
    description: 'Nome da joia',
    example: 'Brincos de Prata 925',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Preço da joia em reais',
    example: 89.9,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number

  @ApiProperty({
    description: 'Quantidade disponível em estoque',
    example: 15,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number

  @ApiProperty({
    description: 'Categoria da joia',
    example: 'Brincos',
    enum: ['Brincos', 'Anéis', 'Piercings', 'Colares', 'Pulseiras'],
  })
  @IsNotEmpty()
  @IsString()
  category: string

  @ApiProperty({
    description: 'Material da joia',
    example: 'Prata 925',
    enum: ['Prata 925', 'Ouro 18k', 'Aço Cirúrgico', 'Titânio', 'Plástico'],
  })
  @IsNotEmpty()
  @IsString()
  material: string

  @ApiProperty({
    description: 'URL da imagem da joia (será gerada automaticamente)',
    example: 'https://s3.amazonaws.com/bucket/jewel-image.jpg',
    readOnly: true,
  })
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string

  @ApiProperty({
    description: 'Descrição detalhada da joia',
    example:
      'Brincos elegantes de prata 925 com pedras naturais. Perfeitos para orelhas sensíveis.',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  description?: string
}
