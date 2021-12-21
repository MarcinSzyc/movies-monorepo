import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElasticClientService } from '../elastic-client/elastic-client.service';
import { MoviesResponse } from '../types/movies-response.interface';

@Injectable()
export class FetchMoviesService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private elasticClientService: ElasticClientService,
  ) {}

  private readonly omdbHost: string = this.configService.get('OMDB_API_HOST');
  private readonly logger = new Logger(FetchMoviesService.name);

  async getMovieDetails(movieTitle: string) {
    const databaseSearchResult = await this.elasticClientService.searchMovie(
      movieTitle,
    );

    if (databaseSearchResult && databaseSearchResult.length > 0) {
      return databaseSearchResult;
    }

    return await this.fetchMovieDetails(movieTitle);
  }

  async fetchMovieDetails(title: string): Promise<MoviesResponse> {
    const hostURL = `${this.omdbHost}/?apikey=${this.configService.get(
      'OMDB_API_KEY',
    )}`;
    const movieData = this.httpService
      .get(`${hostURL}&t=${title}`)
      .pipe(map((response) => response.data));

    try {
      const lastStreamValue = await lastValueFrom(movieData);
      const sanitizedMovieObject = this.sanitizeMovieDetails(lastStreamValue);
      return this.elasticClientService.saveMovie(sanitizedMovieObject);
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.toJSON());

      if (error.response) {
        return undefined;
      }

      throw error;
    }
  }

  async findAll() {
    return this.elasticClientService.findAll();
  }

  private sanitizeMovieDetails(
    movieData: Record<string, string>,
  ): MoviesResponse {
    return {
      title: movieData.Title,
      released: movieData.Released,
      genre: movieData.Genre,
      director: movieData.Director,
    };
  }
}
