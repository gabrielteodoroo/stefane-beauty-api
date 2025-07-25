import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { EditJewelUseCase } from '@/domain/jewel/use-cases/edit-jewel'
import { EditJewelDTO } from '../dtos/edit-jewel.dto'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'
import { UploadService } from '@/infra/upload/upload.service'

@Controller('/jewels/:id')
export class EditJewelController {
  constructor(
    private readonly editJewelUseCase: EditJewelUseCase,
    private readonly uploadService: UploadService,
  ) {}

  @Put()
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('image'))
  async handle(
    @Param('id') id: string,
    @Body() body: Omit<EditJewelDTO, 'imageUrl'> & { imageUrl?: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imageUrl = body.imageUrl
    if (file) {
      imageUrl = await this.uploadService.uploadFile(
        file.originalname,
        file.mimetype,
        file.buffer,
      )
    }
    const { name, price, stock, category, material, description } = body
    const response = await this.editJewelUseCase.handle({
      id,
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      material,
      imageUrl,
      description,
    })
    if (response.isLeft()) {
      if (response.value.constructor === NotFoundError) {
        throw new NotFoundException(response.value.message)
      }
      throw new BadRequestException(response.value.message)
    }
    return JewelPresenter.toHTTP(response.value)
  }
}
