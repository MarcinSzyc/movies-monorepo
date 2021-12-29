import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hello World api endpoint' })
  @UseGuards(AuthGuard('jwt'))
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiOperation({ summary: 'Authenticate using username and password' })
  @ApiResponse({
    status: 201,
    description: 'Token successfully obtained.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username or password',
  })
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async getToken(@Request() req) {
    return {
      token: req.user,
    };
  }
}
