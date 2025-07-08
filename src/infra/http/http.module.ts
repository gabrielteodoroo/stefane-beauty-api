import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { JewelModule } from './jewel/jewel.module'
import { ServiceModule } from './service/service.module'

@Module({
  imports: [UserModule, JewelModule, ServiceModule],
  exports: [UserModule, JewelModule, ServiceModule],
})
export class HttpModule {}
