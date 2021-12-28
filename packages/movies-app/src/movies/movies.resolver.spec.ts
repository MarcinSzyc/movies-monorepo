import { HttpClientService } from '../http-client/http-client.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';
import { ConfigService } from '@nestjs/config';
import { ElasticClientService } from '../elastic-client/elastic-client.service';

describe('MoviesResolver', () => {
  let resolver: MoviesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesResolver,
        MoviesService,
        { provide: HttpClientService, useValue: jest.fn() },
        { provide: ConfigService, useValue: { get: jest.fn() } },
        { provide: ElasticClientService, useValue: jest.fn() },
      ],
    }).compile();

    resolver = module.get<MoviesResolver>(MoviesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
