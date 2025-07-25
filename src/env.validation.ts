import { plainToInstance } from 'class-transformer'
import { IsString, IsUrl, validateSync } from 'class-validator'

class EnvironmentVariables {
  @IsUrl({ protocols: ['postgresql'], require_tld: false })
  DATABASE_URL: string

  @IsString()
  JWT_TOKEN: string

  @IsString()
  S3_BUCKET_NAME: string

  @IsString()
  S3_REGION: string

  @IsString()
  S3_KEY_ID: string

  @IsString()
  S3_ACCESS_KEY: string

  @IsString()
  S3_ENDPOINT: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
