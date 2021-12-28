import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate } from '@nestjs/common';
import { AppModule } from './app.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  const guardMock: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(guardMock)
      .compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    await app.init();
  });

  it('/hello (GET)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: 'hello',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('Hello World!');
  });
});
