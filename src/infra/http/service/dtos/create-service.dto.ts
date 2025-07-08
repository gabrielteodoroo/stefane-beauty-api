import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateServiceDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  category: string
}
