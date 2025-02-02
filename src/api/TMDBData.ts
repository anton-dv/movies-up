import { createPath, createQuery, createRequest } from "../utils/request";
import { PageData } from "./types/PageData";
import { GenreData, GenreDataList } from "./types/GenreData";
import { ErrorStatus, isErrorStatus } from "../types/ErrorStatus";

export type TMDBGetPagesDataArgs = {
  tmdbPages: number[] | number;
  endpoint: string;
  query?: string;
};

export class TMDBData {
  static #lang = "language=en";

  static async getMoviesDiscoverData(tmdbPages: number[] | number) {
    return this.getPagesData({
      endpoint: import.meta.env.API_DISCOVER,
      tmdbPages,
    });
  }

  static async getMoviesSearchData(tmdbPages: number[] | number, query: string) {
    return this.getPagesData({
      endpoint: import.meta.env.API_SEARCH,
      tmdbPages,
      query,
    });
  }

  static async getPagesData(args: TMDBGetPagesDataArgs): Promise<PageData[] | ErrorStatus> {
    const pages = typeof args.tmdbPages === "number" ? [args.tmdbPages] : args.tmdbPages;

    const moviesData: (PageData | ErrorStatus)[] = [];
    const search = args.query ? `query=${args.query}` : "";

    await Promise.all(
      pages.map(async page => {
        const pageNumber = `page=${page}`;

        const path = createPath(args.endpoint);
        const query = createQuery(this.#lang, pageNumber, search);

        moviesData.push(await createRequest<PageData>(path, query));
      }),
    );

    const error = moviesData.find(data => isErrorStatus(data as ErrorStatus));

    if (error === ErrorStatus.NO_INTERNET) return error as ErrorStatus;
    const result = moviesData.filter(data => !isErrorStatus(data as ErrorStatus));

    return result as PageData[];
  }

  static async getGenres(): Promise<GenreData[] | ErrorStatus> {
    const path = createPath(import.meta.env.API_GENRES_LIST);
    const query = createQuery(this.#lang);

    const list = await createRequest<GenreDataList>(path, query);

    return (list as GenreDataList).genres || (list as ErrorStatus);
  }

  static getNamesForGenres(genres: GenreData[], ids: number[]) {
    const list = genres.filter(genre => ids.includes(genre.id));
    return list.map(item => item.name);
  }
}
