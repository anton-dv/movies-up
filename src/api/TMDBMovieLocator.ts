import { MovieData } from "./types/MovieData";
import { PageData } from "./types/PageData";
import { TMDBLocation } from "./types/TMDBLocation";

export class TMDBMovieLocator {
  static getMoviesData(pages: PageData[], locations: TMDBLocation[]): MovieData[] {
    return locations
      .map(location => {
        const movieData = pages.find(page => page.page === location.page) as PageData;
        if (!movieData) return undefined;
        return movieData.results[location.indexOnPage];
      })
      .filter(e => e) as MovieData[];
  }
}
