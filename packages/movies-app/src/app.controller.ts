import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async getToken(@Request() req) {
    return {
      token: req.user,
    };
  }
}
