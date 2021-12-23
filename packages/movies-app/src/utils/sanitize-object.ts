import { MoviesResponse } from '../types/movies-response.interface';

export function sanitizeObject(
  movieData: Record<string, string>,
): MoviesResponse {
  return {
    title: movieData.Title,
    released: movieData.Released,
    genre: movieData.Genre,
    director: movieData.Director,
  };
}
