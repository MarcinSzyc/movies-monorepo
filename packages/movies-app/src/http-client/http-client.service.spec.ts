import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from './http-client.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ElasticClientService } from '../elastic-client/elastic-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpClientService,
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
        {
          provide: ElasticClientService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
