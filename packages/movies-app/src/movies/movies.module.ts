import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { FetchMoviesModule } from '../fetch-movies/fetch-movies.module';

@Module({
  imports: [FetchMoviesModule],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
