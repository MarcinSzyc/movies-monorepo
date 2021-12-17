import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

interface responseTrimmed {
  [key: string]:
    | string
    | {
        title: string;
        released: string;
        genre: string;
        director: string;
      };
}

@Injectable()
export class FetchMoviesService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly omdbHost: string = this.configService.get('OMDB_API_HOST');
  private readonly logger = new Logger(FetchMoviesService.name);

  async fetchMovieDetails(title: string): Promise<responseTrimmed> {
    const hostURL = `${this.omdbHost}/?apikey=${this.configService.get(
      'OMDB_API_KEY',
    )}`;
    const movieData = this.httpService
      .get(`${hostURL}&t=${title}`)
      .pipe(map((response) => response.data));

    try {
      return await lastValueFrom(movieData);
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.toJSON());

      if (error.response) {
        return undefined;
      }

      throw error;
    }
  }
}
