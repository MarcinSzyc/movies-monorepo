import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Shards {
  @Field()
  total: number;

  @Field()
  successful: number;

  @Field()
  failed: number;
}

@ObjectType()
export class UpdateMovie {
  @Field()
  _shards: Shards;

  @Field()
  _index: string;

  @Field()
  _type: string;

  @Field()
  _id: string;

  @Field()
  _version: number;

  @Field()
  _primary_term: number;

  @Field()
  _seq_no: number;

  @Field()
  result: string;
}
