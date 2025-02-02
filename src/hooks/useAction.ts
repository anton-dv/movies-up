import { TMDB } from "../api/TMDB";
import { Page } from "../api/types/Page";
import { PageValue } from "../api/types/PageValue";
import { ErrorStatus, isErrorStatus } from "../types/ErrorStatus";
import { createPath, createQuery, createRequest } from "../utils/request";
import { getSessionId } from "../utils/session";
import { useQuery } from "./useQuery";
import { useRated } from "./useRated";
import { useSearch } from "./useSearch";

export const useAction = () => {
  const [queryText, setQueryText] = useQuery();
  const [, setSearchPage] = useSearch();
  const [rated, setRatedPage] = useRated();

  return {
    search: async (query: string) => {
      setSearchPage(undefined);
      setQueryText(query);

      const result = query ? await TMDB.getMovesSearch(query, 1) : await TMDB.getMoviesDiscover(1);
      setSearchPage(result);
    },

    switchSearchPage: async (current: number) => {
      setSearchPage(undefined);

      const result = queryText
        ? await TMDB.getMovesSearch(queryText, current)
        : await TMDB.getMoviesDiscover(current);

      setSearchPage(result);
    },

    rateMovie: async (id: number, value: number) => {
      const path = createPath(`movie/${id}/rating`);
      const query = createQuery(`guest_session_id=${await getSessionId()}`);
      const body = { value };

      const movies =
        (rated && !isErrorStatus(rated as ErrorStatus) && (rated as Page).movies) || [];

      const include = !!movies.find(movie => movie.id === id);
      const expectLength = ((rated as Page).totalItems || 0) + (include ? 0 : 1);

      const current = (rated as Page).current || 1;

      if (!movies.length) setRatedPage(undefined);

      let attempts = 0;
      while (true) {
        attempts++;

        const status = await createRequest<ErrorStatus>(path, query, body);
        if (status === ErrorStatus.NO_INTERNET) {
          setSearchPage(status);
          setRatedPage(status);
          return;
        }

        const result = await new Promise((resolve: (page: PageValue) => void) => {
          setTimeout(async () => {
            resolve(await TMDB.getRated(current));
          }, 1000);
        });

        const ok = !isErrorStatus(result as ErrorStatus) && result;
        if (ok && (result as Page).totalItems === expectLength) {
          setRatedPage(result);
          break;
        }

        if (result === ErrorStatus.NO_INTERNET) {
          setRatedPage(result);
          setSearchPage(result);
          break;
        }

        if (attempts >= 5) break;
      }
    },

    switchRatedPage: async (current: number) => {
      setRatedPage(undefined);

      const result = await TMDB.getRated(current);

      setRatedPage(result);
    },
  };
};
