import { HttpClientService } from '../http-client/http-client.service';
import { Injectable } from '@nestjs/common';
import { MoviesResponse } from '../types/movies-response.interface';
import { ConfigService } from '@nestjs/config';
import { ElasticClientService } from '../elastic-client/elastic-client.service';
import { sanitizeObject } from '../utils/sanitize-object';

@Injectable()
export class MoviesService {
  constructor(
    private httpService: HttpClientService,
    private readonly configService: ConfigService,
    private elasticClientService: ElasticClientService,
  ) {}

  private readonly omdbHost: string = `${this.configService.get(
    'OMDB_API_HOST',
  )}/?apikey=${this.configService.get('OMDB_API_KEY')}`;

  async findAll() {
    const result = await this.elasticClientService.findAll();

    return result.map((hit) => {
      return hit._source;
    });
  }

  async findOne(movieTitle: string): Promise<any> {
    const databaseSearchResult = await this.elasticClientService.searchMovie(
      movieTitle,
    );

    if (databaseSearchResult && databaseSearchResult.length > 0) {
      return databaseSearchResult[0]._source;
    }

    const fetchedMovieDetails = await this.httpService.fetchFromURL(
      `${this.omdbHost}&t=${movieTitle}`,
    );
    const reducedMovieDetails = sanitizeObject(fetchedMovieDetails);
    const savedMovieDetails = await this.elasticClientService.saveMovie(
      reducedMovieDetails,
    );

    return JSON.parse(savedMovieDetails.meta.request.params.body as string);
  }

  // TODO finish after AXIOS fetch
  // create(createMovieInput: CreateMovieInput) {
  //   return 'This action adds a new movie';
  // }

  // update(updateMovieInput: UpdateMovieInput) {
  //   return `This action updates a #${id} movie`;
  // }

  remove(title: string) {
    return;
  }
}
