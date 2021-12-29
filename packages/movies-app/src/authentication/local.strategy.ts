import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const result = await this.authenticationService.validateUser(
        username,
        password,
      );
      if (!result.token) {
        throw new UnauthorizedException();
      }
      return result.token;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
