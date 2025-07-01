import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    // Constructor is required for dependency injection
  }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
