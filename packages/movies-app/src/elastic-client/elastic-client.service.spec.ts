import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { ElasticClientService } from './elastic-client.service';

describe('ElasticClientService', () => {
  let service: ElasticClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElasticClientService,
        {
          provide: ElasticsearchService,
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

    service = module.get<ElasticClientService>(ElasticClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
