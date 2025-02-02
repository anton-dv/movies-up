import { getArray } from "../utils/array";
import { PageData } from "./types/PageData";
import { TMDBLocation } from "./types/TMDBLocation";

export class TMDBPageLocator {
  static locateTargetPage(page: number): TMDBLocation[] {
    const perPage = import.meta.env.API_ITEMS_PER_PAGE;
    const lastIndex = page * perPage - 1;

    const tmdbIndexes = getArray(perPage).map((_, index) => -(perPage - index - 1 - lastIndex));

    return tmdbIndexes.map(tmdbIndex => ({
      page: this.#getTMDBPage(tmdbIndex),
      indexOnPage: this.#getTMDBIndexOnPage(tmdbIndex),
    }));
  }

  static getPagesForLocations(locations: TMDBLocation[]): number[] {
    return Array.from(new Set(locations.map(location => location.page)));
  }

  static getTotal(pages: PageData[]): number {
    return pages[0] ? this.locateTotalPage(pages[0].total_results) : 0;
  }

  static locateTotalPage(tmdbTotalItems: number) {
    const total = Math.ceil(tmdbTotalItems / import.meta.env.API_ITEMS_PER_PAGE);
    const max = import.meta.env.API_MAX_PAGES as number;
    return total > max ? max : total;
  }

  static #getTMDBPage(tmdbIndex: number) {
    return Math.floor(tmdbIndex / 20) + 1;
  }

  static #getTMDBIndexOnPage(tmdbIndex: number) {
    return tmdbIndex - Math.floor(tmdbIndex / 20) * 20;
  }
}
