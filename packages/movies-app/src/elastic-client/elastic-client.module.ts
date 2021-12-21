import { Module } from '@nestjs/common';
import { ElasticClientService } from './elastic-client.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: 'http://elasticsearch:9200',
      }),
    }),
  ],
  providers: [ElasticClientService],
  exports: [ElasticClientService],
})
export class ElasticClientModule {}
