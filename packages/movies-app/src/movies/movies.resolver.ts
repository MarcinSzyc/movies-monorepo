import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { UpdateMovieInput } from './dto/update-movie.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../authentication/graph-ql-guard.guard';
import { DeleteMovie } from './dto/delete-movie.output';
import { UpdateMovie } from './dto/update-movie.output';

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

  @Mutation(() => UpdateMovie)
  @UseGuards(GqlAuthGuard)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.moviesService.update(updateMovieInput);
  }

  @Mutation(() => DeleteMovie)
  @UseGuards(GqlAuthGuard)
  async removeMovie(@Args('title', { type: () => String }) title: string) {
    return await this.moviesService.remove(title);
  }
}
