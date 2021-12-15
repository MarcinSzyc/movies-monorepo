import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => [Movie])
  findAll() {
    return this.moviesService.findAll();
  }

  @Query(() => Movie)
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
