import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../authentication/graph-ql-guard.guard';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => [Movie])
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.moviesService.findAll();
  }

  @Query(() => Movie)
  @UseGuards(GqlAuthGuard)
  findOne(@Args('title', { type: () => String }) title: string) {
    return this.moviesService.findOne(title);
  }

  // TODO finish after AXIOS fetch
  // @Mutation(() => Movie)
  // createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
  //   return this.moviesService.create(createMovieInput);
  // }

  // @Mutation(() => Movie)
  // updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
  //   return this.moviesService.update(updateMovieInput.id, updateMovieInput);
  // }

  // @Mutation(() => Movie)
  // removeMovie(@Args('id', { type: () => Int }) id: number) {
  //   return this.moviesService.remove(id);
  // }
}
