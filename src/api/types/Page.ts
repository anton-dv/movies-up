import { Movie } from "./Movie";

export type Page = {
  current: number;
  total: number;
  movies: Movie[];
  totalItems: number;
};
