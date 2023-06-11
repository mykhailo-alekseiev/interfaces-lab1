import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/about')
  getAppInfo(): {
    logoSrc: string;
    title: string;
    description: string;
  } {
    return {
      logoSrc: `${process.env.DOMAIN}/public/images/logo.png`,
      title: 'Lightning Calculator',
      description: 'My Web lab project description',
    };
  }
}
