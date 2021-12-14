import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { FetchMovieModule } from '../fetch-movie/fetch-movie.module';

@Module({
  imports: [FetchMovieModule],
  providers: [MoviesResolver, MoviesService]
})
export class MoviesModule {}
