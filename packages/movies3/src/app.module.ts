import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { FetchMovieModule } from './fetch-movie/fetch-movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MoviesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
