import { Test, TestingModule } from '@nestjs/testing';
import { FetchMoviesService } from './fetch-movies.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

describe('FetchMoviesService', () => {
  let service: FetchMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchMoviesService,
        {
          provide: HttpService,
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

    service = module.get<FetchMoviesService>(FetchMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
