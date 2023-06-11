import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/about')
  @ApiOperation({
    summary: 'Get info about app',
    description: 'Return title, description and image source',
  })
  getAppInfo(): {
    logoSrc: string;
    title: string;
    description: string;
  } {
    return {
      logoSrc: `${process.env.DOMAIN}/public/images/logo.png`,
      title: 'Lightning Library',
      description: 'My Web lab project description',
    };
  }
}
