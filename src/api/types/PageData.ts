import { MovieData } from "./MovieData";

export type PageData = {
  page: number;
  total_results: number;
  results: MovieData[];
};
