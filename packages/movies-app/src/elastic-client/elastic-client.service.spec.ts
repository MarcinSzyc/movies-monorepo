import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { ElasticClientService } from './elastic-client.service';

describe('ElasticClientService', () => {
  let elasticClientService: ElasticClientService;
  let elasticSearchService: ElasticsearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElasticClientService,
        {
          provide: ElasticsearchService,
          useValue: {
            info: jest.fn(),
            indices: {
              exists: jest.fn(),
              create: jest.fn(),
            },
            index: jest.fn(),
            search: jest.fn(),
            deleteByQuery: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    elasticClientService =
      module.get<ElasticClientService>(ElasticClientService);
    elasticSearchService =
      module.get<ElasticsearchService>(ElasticsearchService);
  });

  it('should be defined', () => {
    expect(elasticClientService).toBeDefined();
  });

  describe('info', () => {
    it('should call info method successfully', async () => {
      const loggerLogMock = jest
        .spyOn(elasticClientService['logger'], 'log')
        .mockImplementation(jest.fn());

      const infoMock = jest
        .spyOn(elasticSearchService, 'info')
        .mockResolvedValue([] as never);

      await elasticClientService.info();

      expect(loggerLogMock).toBeCalledTimes(1);
      expect(infoMock).toBeCalledTimes(1);
    });
  });

  describe('setupIndex', () => {
    it('should call setupIndex successfully', async () => {
      const existsMock = jest
        .spyOn(elasticSearchService.indices, 'exists')
        .mockResolvedValue({} as never);

      const createIndexMock = jest
        .spyOn(elasticSearchService.indices, 'create')
        .mockImplementation(jest.fn());

      await elasticClientService.setupIndex();

      expect(existsMock).toBeCalledTimes(1);
      expect(createIndexMock).toBeCalledTimes(1);
    });

    it('should call setupIndex successfully when index exist', async () => {
      const existsMock = jest
        .spyOn(elasticSearchService.indices, 'exists')
        .mockResolvedValue({ body: 'exists' } as never);

      jest
        .spyOn(elasticSearchService.indices, 'create')
        .mockImplementation(jest.fn());

      await elasticClientService.setupIndex();

      expect(existsMock).toBeCalledTimes(1);
    });
  });

  describe('saveMovie', () => {
    it('should call saveMovie successfully', async () => {
      const movieDetailsMock = {
        title: 'title',
        released: 'released',
        genre: 'genre',
        director: 'director',
      };
      const indexMovieMock = jest
        .spyOn(elasticSearchService, 'index')
        .mockResolvedValue({} as never);

      const loggerLogMock = jest
        .spyOn(elasticClientService['logger'], 'log')
        .mockImplementation(jest.fn());

      await elasticClientService.saveMovie(movieDetailsMock);

      expect(loggerLogMock).toBeCalledTimes(1);
      expect(indexMovieMock).toBeCalledTimes(1);
    });

    it('should call saveMovie successfully when index returns error', async () => {
      const movieDetailsMock = {
        title: 'title',
        released: 'released',
        genre: 'genre',
        director: 'director',
      };
      jest.spyOn(elasticSearchService, 'index').mockImplementationOnce(() => {
        throw new Error('Testing Error');
      });

      const loggerLogMock = jest
        .spyOn(elasticClientService['logger'], 'error')
        .mockImplementation(jest.fn());

      await expect(
        elasticClientService.saveMovie(movieDetailsMock),
      ).rejects.toThrow();

      expect(loggerLogMock).toBeCalledTimes(1);
    });
  });

  describe('searchMovie', () => {
    const movieTitle = 'title';
    const responseMock = {
      body: {
        hits: {
          hits: 'hit',
        },
      },
    };
    it('should call searchMovie successfully', async () => {
      const searchMovieMock = jest
        .spyOn(elasticSearchService, 'search')
        .mockResolvedValue(responseMock as never);

      await elasticClientService.searchMovie(movieTitle);

      expect(searchMovieMock).toBeCalledTimes(1);
    });

    it('should call searchMovie successfully when search return error', async () => {
      jest.spyOn(elasticSearchService, 'search').mockImplementationOnce(() => {
        throw new Error('Testing Error');
      });

      const loggerLogMock = jest
        .spyOn(elasticClientService['logger'], 'error')
        .mockImplementation(jest.fn());

      await expect(
        elasticClientService.searchMovie(movieTitle),
      ).rejects.toThrow();

      expect(loggerLogMock).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    const responseMock = {
      body: {
        hits: {
          hits: 'hit',
        },
      },
    };
    it('should call findAll successfully', async () => {
      const findAllMoviesMock = jest
        .spyOn(elasticSearchService, 'search')
        .mockResolvedValue(responseMock as never);

      await elasticClientService.findAll();

      expect(findAllMoviesMock).toBeCalledTimes(1);
    });

    it('should call findAll successfully when search return error', async () => {
      jest.spyOn(elasticSearchService, 'search').mockImplementationOnce(() => {
        throw new Error('Testing Error');
      });

      const loggerLogMock = jest
        .spyOn(elasticClientService['logger'], 'error')
        .mockImplementation(jest.fn());

      await expect(elasticClientService.findAll()).rejects.toThrow();

      expect(loggerLogMock).toBeCalledTimes(1);
    });
  });

  describe('removeMovie', () => {
    it('should call removeMovie successfully', async () => {
      const movieTitle = 'title';
      const removeMovieMock = jest
        .spyOn(elasticSearchService, 'deleteByQuery')
        .mockImplementationOnce(jest.fn());

      await elasticClientService.removeMovie(movieTitle);

      expect(removeMovieMock).toBeCalledTimes(1);
    });

    it('should call removeMovie successfully when deleteByQuery returns error', async () => {
      const movieTitle = 'title';
      const removeMovieMock = jest
        .spyOn(elasticSearchService, 'deleteByQuery')
        .mockImplementationOnce(() => {
          throw new Error('Testing Error');
        });

      await expect(
        elasticClientService.removeMovie(movieTitle),
      ).rejects.toThrow();

      expect(removeMovieMock).toBeCalledTimes(1);
    });
  });

  describe('updateMovie', () => {
    const movieIDMock = 'id';
    const movieDetailsMock = {
      title: 'title',
      released: 'released',
      genre: 'genre',
      director: 'director',
    };
    it('should call successfully updateMovie', async () => {
      const updateMovieMock = jest
        .spyOn(elasticSearchService, 'update')
        .mockResolvedValue({ body: {} } as never);

      await elasticClientService.updateMovie(movieIDMock, movieDetailsMock);

      expect(updateMovieMock).toBeCalledTimes(1);
    });

    it('should call successfully updateMovie when update returns error', async () => {
      const updateMovieMock = jest
        .spyOn(elasticSearchService, 'update')
        .mockImplementationOnce(() => {
          throw new Error('Testing Error');
        });

      const loggerLogMock = jest
        .spyOn(elasticClientService['logger'], 'error')
        .mockImplementation(jest.fn());

      await expect(
        elasticClientService.updateMovie(movieIDMock, movieDetailsMock),
      ).rejects.toThrow();

      expect(updateMovieMock).toBeCalledTimes(1);
      expect(loggerLogMock).toBeCalledTimes(1);
    });
  });
});
