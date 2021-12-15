import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { FetchMoviesModule } from './fetch-movies/fetch-movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MoviesModule,
    FetchMoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
