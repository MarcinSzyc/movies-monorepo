import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpClientService {
  constructor(private httpService: HttpService) {}

  private readonly logger = new Logger(HttpClientService.name);

  async fetchFromURL(url: string): Promise<any> {
    const movieData = this.httpService
      .get(url)
      .pipe(map((response) => response.data));

    try {
      return await lastValueFrom(movieData);
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.toJSON());

      if (error.response) {
        return undefined;
      }

      throw error;
    }
  }
}
