import { HttpClientService } from '../http-client/http-client.service';
import { Injectable } from '@nestjs/common';
import { MoviesResponse } from '../types/movies-response.interface';
import { ConfigService } from '@nestjs/config';
import { ElasticClientService } from '../elastic-client/elastic-client.service';
import { sanitizeObject } from '../utils/sanitize-object';
import { UpdateMovieInput } from './dto/update-movie.input';

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
    await this.elasticClientService.saveMovie(reducedMovieDetails);

    return reducedMovieDetails;
  }

  // TODO finish after AXIOS fetch
  // create(createMovieInput: CreateMovieInput) {
  //   return 'This action adds a new movie';
  // }

  async update(updateMovieInput: UpdateMovieInput) {
    const databaseSearchResult = await this.elasticClientService.searchMovie(
      updateMovieInput.title,
    );
    const fetchedMovieDetails = await this.httpService.fetchFromURL(
      `${this.omdbHost}&t=${updateMovieInput.title}`,
    );

    const updatedMovie = await this.elasticClientService.updateMovie(
      databaseSearchResult[0]._id,
      fetchedMovieDetails,
    );
    return updatedMovie;
  }

  async remove(movieTitle: string) {
    const databaseSearchResult = await this.elasticClientService.searchMovie(
      movieTitle,
    );

    if (!databaseSearchResult && databaseSearchResult.length === 0) {
      return {
        error: 'No such movie in the database',
      };
    }

    const result = await this.elasticClientService.removeMovie(movieTitle);
    return result.body;
  }
}
