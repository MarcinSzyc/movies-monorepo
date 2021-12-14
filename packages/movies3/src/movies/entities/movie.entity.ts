import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  title: string

  @Field()
  released: string

  @Field()
  genre: string

  @Field()
  director: string
}
