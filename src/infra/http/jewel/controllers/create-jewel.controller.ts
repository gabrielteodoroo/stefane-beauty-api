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
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger'
import { JewelResponseDTO } from '../dtos/jewel-response.dto'

@ApiTags('jewels')
@Controller('/jewels')
export class CreateJewelController {
  constructor(
    private readonly createJewelUseCase: CreateJewelUseCase,
    private readonly uploadService: UploadService,
  ) {}

  @ApiOperation({
    summary: 'Cadastrar nova joia',
    description:
      'Cria uma nova joia com upload de imagem. A imagem será processada e armazenada no S3.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateJewelDTO,
    description: 'Dados da joia e arquivo de imagem (obrigatório)',
  })
  @ApiResponse({
    status: 201,
    description: 'Joia criada com sucesso',
    type: JewelResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou imagem obrigatória',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido',
  })
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
