import { HttpClientService } from '../http-client/http-client.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { ElasticClientService } from '../elastic-client/elastic-client.service';
import { ConfigService } from '@nestjs/config';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpClientService,
          useValue: jest.fn(),
        },
        {
          provide: ElasticClientService,
          useValue: jest.fn(),
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
