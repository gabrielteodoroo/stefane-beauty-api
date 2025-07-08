import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString()
  name: string

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsString()
  email: string

  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString()
  password: string
}
