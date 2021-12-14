import { Test, TestingModule } from '@nestjs/testing';
import { FetchMovieService } from './fetch-movie.service';

describe('FetchMovieService', () => {
  let service: FetchMovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchMovieService],
    }).compile();

    service = module.get<FetchMovieService>(FetchMovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
