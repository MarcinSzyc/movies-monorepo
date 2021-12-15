import { Injectable } from '@nestjs/common';
import { FetchMoviesService } from '@movies/fetch-movies/fetch-movies.service';
import { MoviesResponse } from '../types/movies-response.interface';

@Injectable()
export class MoviesService {
  constructor(private fetchMoviesService: FetchMoviesService) {}

  findAll() {
    return [
      {
        title: 'title',
        released: '12/12/12',
        genre: 'TEST',
        director: 'TEST',
      },
    ];
  }

  async findOne(movieTitle: string): Promise<MoviesResponse> {
    const movieDetails = await this.fetchMoviesService.fetchMovieDetails(
      movieTitle,
    );

    return {
      title: movieDetails.Title,
      released: movieDetails.Released,
      genre: movieDetails.Genre,
      director: movieDetails.Director,
    } as MoviesResponse;
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
