import { PartialType } from '@nestjs/swagger'
import { CreateJewelDTO } from './create-jewel.dto'

export class EditJewelDTO extends PartialType(CreateJewelDTO) {}
