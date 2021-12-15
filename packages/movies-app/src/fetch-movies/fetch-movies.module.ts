import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FetchMoviesService } from './fetch-movies.service';

@Module({
  imports: [HttpModule],
  providers: [FetchMoviesService],
  exports: [FetchMoviesService],
})
export class FetchMoviesModule {}
