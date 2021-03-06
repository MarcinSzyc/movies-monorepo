import { ObjectType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Movie {
  @Field(() => String)
  @IsOptional()
  title: string;

  @Field()
  released: string;

  @Field()
  genre: string;

  @Field()
  director: string;
}
