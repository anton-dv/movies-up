import { ErrorStatus, isErrorStatus } from "../types/ErrorStatus";
import { getSessionId } from "../utils/session";
import { TMDBData } from "./TMDBData";
import { TMDBMovieLocator } from "./TMDBMovieLocator";
import { TMDBPageLocator } from "./TMDBPageLocator";
import { GenreData } from "./types/GenreData";
import { Page } from "./types/Page";
import { PageData } from "./types/PageData";

export class TMDB {
  static async getMoviesDiscover(current: number): Promise<Page | ErrorStatus> {
    return this.#getMovies(import.meta.env.API_DISCOVER, current);
  }

  static async getMovesSearch(query: string, current: number): Promise<Page | ErrorStatus> {
    return this.#getMovies(import.meta.env.API_SEARCH, current, query);
  }

  static async getRated(current: number): Promise<Page | ErrorStatus> {
    const session = await getSessionId();

    if (isErrorStatus(session as ErrorStatus)) return session as ErrorStatus;

    const endpoint = `guest_session/${session}/rated/movies`;
    return this.#getMovies(endpoint, current);
  }

  static async #getMovies(
    endpoint: string,
    current: number,
    query?: string,
  ): Promise<Page | ErrorStatus> {
    const locations = TMDBPageLocator.locateTargetPage(current);
    const tmdbPages = TMDBPageLocator.getPagesForLocations(locations);
    const dataPages = await TMDBData.getPagesData({ tmdbPages, query, endpoint });
    if (isErrorStatus(dataPages as ErrorStatus)) return dataPages as ErrorStatus;
    if (!(dataPages as PageData[]).length) return ErrorStatus.EMPTY;

    const moviesData = TMDBMovieLocator.getMoviesData(dataPages as PageData[], locations);
    const genres = await TMDBData.getGenres();

    if (isErrorStatus(genres as ErrorStatus)) return genres as ErrorStatus;

    const movies = moviesData
      .filter(i => i)
      .map(data => ({
        id: data.id,
        title: data.title,
        about: data.overview,
        image: data.poster_path,
        rating: data.vote_average,
        rated: data.rating,
        date: data.release_date ? new Date(data.release_date) : undefined,
        genres: genres ? TMDBData.getNamesForGenres(genres as GenreData[], data.genre_ids) : [],
      }));

    const totalItems = (dataPages as PageData[])[0].total_results;
    const total = TMDBPageLocator.getTotal(dataPages as PageData[]);

    const result = { movies, current, total, totalItems };
    return result;
  }
}
