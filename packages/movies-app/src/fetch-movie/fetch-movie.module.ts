import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FetchMovieService } from './fetch-movie.service';

@Module({
  imports: [HttpModule],
  providers: [FetchMovieService],
  exports: [FetchMovieService]
})
export class FetchMovieModule {}
