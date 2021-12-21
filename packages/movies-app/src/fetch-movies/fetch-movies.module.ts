import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FetchMoviesService } from './fetch-movies.service';
import { ElasticClientModule } from '../elastic-client/elastic-client.module';

@Module({
  imports: [HttpModule, ElasticClientModule],
  providers: [FetchMoviesService],
  exports: [FetchMoviesService],
})
export class FetchMoviesModule {}
