import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { HttpClientModule } from './http-client/http-client.module';
import { ElasticClientModule } from './elastic-client/elastic-client.module';
import { AuthenticationModule } from './authentication/authentication.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '.env'),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MoviesModule,
    HttpClientModule,
    ElasticClientModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
