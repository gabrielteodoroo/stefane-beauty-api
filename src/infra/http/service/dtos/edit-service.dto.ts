import { PartialType } from '@nestjs/swagger'
import { CreateServiceDTO } from './create-service.dto'

export class EditServiceDTO extends PartialType(CreateServiceDTO) {}
