import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { MoviesResponse } from '../types/movies-response.interface';

@Injectable()
export class ElasticClientService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(ElasticClientService.name);
  private readonly index = this.configService.get('ELASTICSEARCH_INDEX');

  async info() {
    const info = await this.elasticsearchService.info();
    this.logger.log(info);
  }

  async setupIndex() {
    const { body: indexExists } =
      await this.elasticsearchService.indices.exists({
        index: this.index,
      });

    if (indexExists) {
      return;
    }

    this.elasticsearchService.indices.create({
      index: this.index,
      body: {
        mappings: {
          properties: {
            title: { type: 'text' },
            released: { type: 'text' },
            genre: { type: 'text' },
            director: { type: 'text' },
          },
        },
      },
    });
  }

  async saveMovie(movieDetails: MoviesResponse) {
    return await this.indexMovie(movieDetails);
  }

  private async indexMovie(
    movieDetails: MoviesResponse,
    indexName = this.index,
  ) {
    try {
      const result = await this.elasticsearchService.index({
        index: indexName,
        refresh: true,
        body: {
          title: movieDetails.title,
          released: movieDetails.released,
          genre: movieDetails.genre,
          director: movieDetails.director,
        },
      });
      this.logger.log(`Movie ${movieDetails.title} created successfully!`);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async searchMovie(movieTitle: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: this.index,
        body: {
          query: {
            match: {
              title: movieTitle,
            },
          },
        },
      });
      return result.body.hits.hits;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this.elasticsearchService.search({
        index: this.index,
        body: {
          query: {
            match_all: {},
          },
        },
      });
      return result.body.hits.hits;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async removeMovie(movieTitle: string) {
    try {
      const result = await this.elasticsearchService.deleteByQuery({
        index: this.index,
        body: {
          query: {
            match: {
              title: movieTitle,
            },
          },
        },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async updateMovie(movieId: string, movieDetails: Record<string, any>) {
    try {
      const result = await this.elasticsearchService.update({
        index: this.index,
        id: movieId,
        body: {
          doc: {
            title: movieDetails.title,
            released: movieDetails.released,
            genre: movieDetails.genre,
            director: movieDetails.director,
          },
        },
      });
      return result.body;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
