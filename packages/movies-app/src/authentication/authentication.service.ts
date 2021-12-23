import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private readonly authenticationUrl = this.configService.get(
    'AUTHENTICATION_SERVICE_HOST',
  );
  private readonly logger = new Logger(AuthenticationService.name);

  async validateUser(username: string, password: string): Promise<any> {
    const body = {
      username: username,
      password: password,
    };
    const response = await this.httpService
      .post(this.authenticationUrl, body)
      .pipe(map((response) => response.data));
    try {
      return await lastValueFrom(response);
    } catch (error) {
      this.logger.error(error);
      return error.response.data;
    }
  }

  async login(credentials: any) {
    const payload = {
      username: credentials.username,
      password: credentials.userId,
    };

    const tokenResponse = await this.httpService
      .post(this.authenticationUrl, payload)
      .pipe(map((response) => response.data));

    try {
      return await lastValueFrom(tokenResponse);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
