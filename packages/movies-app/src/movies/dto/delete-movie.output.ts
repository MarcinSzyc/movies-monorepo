import { float } from '@elastic/elasticsearch/api/types';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Retries {
  @Field()
  bulk: number;

  @Field()
  search: number;
}

@ObjectType()
export class DeleteMovie {
  @Field()
  took: string;

  @Field()
  timed_out: boolean;

  @Field()
  total: number;

  @Field()
  deleted: number;

  @Field()
  batches: number;

  @Field()
  version_conflicts: number;

  @Field()
  noops: number;

  @Field()
  retries: Retries;

  @Field()
  throttled_millis: number;

  @Field()
  request_per_second: float;

  @Field()
  throtled_until_millis: number;

  @Field()
  failures: string;
}
