import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { HttpClientModule } from '../http-client/http-client.module';
import { ElasticClientModule } from '../elastic-client/elastic-client.module';
import { MoviesController } from './movies.controller';

@Module({
  imports: [HttpClientModule, ElasticClientModule],
  providers: [MoviesResolver, MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
