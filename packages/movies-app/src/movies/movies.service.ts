import { Injectable } from '@nestjs/common';
import { FetchMovieService } from '../fetch-movie/fetch-movie.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './entities/movie.entity';


@Injectable()
export class MoviesService {
  constructor (
    private fetchMoviesService: FetchMovieService,
  ){}
  
  findAll() {
    return [{
      title: 'title',
      released: "12/12/12",
      genre: "TEST",
      director: "TEST",
    }]
  }
  
  async findOne(title: string): Promise<Movie> {
    const movie = await this.fetchMoviesService.fetchMovieDetails(title);
    return {
      title: title,
      released: "12/12/12",
      genre: "TEST",
      director: "TEST",
    }
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
