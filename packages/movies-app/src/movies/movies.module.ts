import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { HttpClientModule } from '../http-client/http-client.module';
import { ElasticClientModule } from '../elastic-client/elastic-client.module';

@Module({
  imports: [HttpClientModule, ElasticClientModule],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
