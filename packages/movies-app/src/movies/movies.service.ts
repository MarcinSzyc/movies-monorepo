import { FetchMoviesService } from '../fetch-movies/fetch-movies.service';
import { Injectable } from '@nestjs/common';
import { MoviesResponse } from '../types/movies-response.interface';

@Injectable()
export class MoviesService {
  constructor(private fetchMoviesService: FetchMoviesService) {}

  async findAll() {
    const result = await this.fetchMoviesService.findAll();

    return result.map((hit) => {
      return hit._source;
    });
  }

  async findOne(movieTitle: string): Promise<MoviesResponse> {
    const movieDetails = await this.fetchMoviesService.getMovieDetails(
      movieTitle,
    );

    return movieDetails[0]._source;
  }

  // TODO finish after AXIOS fetch
  // create(createMovieInput: CreateMovieInput) {
  //   return 'This action adds a new movie';
  // }

  // update(updateMovieInput: UpdateMovieInput) {
  //   return `This action updates a #${id} movie`;
  // }

  // remove(title: string) {
  //   return `This action removes a #${id} movie`;
  // }
}
