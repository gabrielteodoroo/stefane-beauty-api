import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateJewelDTO } from '../dtos/create-jewel.dto'
import { CreateJewelUseCase } from '@/domain/jewel/use-cases/create-jewel'
import { JewelPresenter } from '@/infra/presenters/jewel-presenter'
import { UploadService } from '@/infra/upload/upload.service'

@Controller('/jewels')
export class CreateJewelController {
  constructor(
    private readonly createJewelUseCase: CreateJewelUseCase,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Omit<CreateJewelDTO, 'imageUrl'> & { imageUrl?: string },
  ) {
    if (!file) {
      throw new BadRequestException('Imagem é obrigatória')
    }
    const imageUrl = await this.uploadService.uploadFile(
      file.originalname,
      file.mimetype,
      file.buffer,
    )
    const { name, price, stock, category, material, description } = body
    const response = await this.createJewelUseCase.handle({
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      material,
      imageUrl,
      description,
    })
    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }
    return JewelPresenter.toHTTP(response.value)
  }
}
