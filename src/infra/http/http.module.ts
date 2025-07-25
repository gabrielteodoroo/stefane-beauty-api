import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { JewelModule } from './jewel/jewel.module'
import { ServiceModule } from './service/service.module'
import { UploadFileModule } from './upload/upload-file.module'

@Module({
  imports: [UserModule, JewelModule, ServiceModule, UploadFileModule],
  exports: [UserModule, JewelModule, ServiceModule, UploadFileModule],
})
export class HttpModule {}
