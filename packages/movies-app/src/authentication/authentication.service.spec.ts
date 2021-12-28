import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import * as rxjs from 'rxjs';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpService: HttpService;

  let usernameMock: string;
  let passwordMock: string;
  let postResponseMock: AxiosResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: HttpService, useValue: { post: jest.fn() } },
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
    httpService = module.get<HttpService>(HttpService);

    usernameMock = 'usernameMock';
    passwordMock = 'passwordMock';
    postResponseMock = {
      data: {
        token: 'jwtTokenMock',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {},
    };
  });

  it('should be defined', () => {
    expect(authenticationService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should call validateUser successfully', async () => {
      const httpServiceMock = jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => rxjs.of(postResponseMock));

      const expectedResult = {
        token: 'jwtTokenMock',
      };

      const result = await authenticationService.validateUser(
        usernameMock,
        passwordMock,
      );

      expect(result).toEqual(expectedResult);
      expect(httpServiceMock).toHaveBeenCalledTimes(1);
    });

    it('should work when post call failed', async () => {
      jest.spyOn(httpService, 'post').mockImplementationOnce(() => {
        throw new Error('Testing Error');
      });

      await expect(
        authenticationService.validateUser(usernameMock, passwordMock),
      ).rejects.toThrow();
    });
  });

  describe('login method', () => {
    it('should call login method successfully', async () => {
      const credenatials = {
        username: usernameMock,
        password: passwordMock,
      };
      const httpServiceMock = jest
        .spyOn(httpService, 'post')
        .mockImplementation(() => rxjs.of(postResponseMock));

      const expectedResult = {
        token: 'jwtTokenMock',
      };

      const result = await authenticationService.login(credenatials);

      expect(result).toEqual(expectedResult);
      expect(httpServiceMock).toHaveBeenCalledTimes(1);
    });

    it('should work when post call failed', async () => {
      const credenatials = {
        username: usernameMock,
        password: passwordMock,
      };

      jest.spyOn(httpService, 'post').mockImplementationOnce(() => {
        throw new Error('Testing Error');
      });

      await expect(authenticationService.login(credenatials)).rejects.toThrow();
    });
  });
});
