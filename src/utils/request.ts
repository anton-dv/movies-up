import axios, { AxiosError } from "axios";
import { ErrorStatus } from "../types/ErrorStatus";

const trimSlash = (item: string) => {
  const result = item.startsWith("/") ? item.slice(1) : item;
  return result.endsWith("/") ? result.slice(0, item.length - 1) : result;
};

export const createPath = (...rest: string[]): string => {
  if (!rest.length) return "";
  let parts = rest.map(part => trimSlash(part));

  parts = parts[0].startsWith("https") ? parts : [import.meta.env.API_BASE_URL, ...parts];
  return parts.join("/");
};

export const createQuery = (...rest: string[]): string => {
  const apiKey = `api_key=${import.meta.env.API_KEY}`;

  if (!rest.length) return apiKey;
  const params = rest.filter(item => item !== "");

  const key = params.find(item => item.startsWith("api_key=")) ? "" : apiKey;
  const query = params.join("&");

  return key + (key && query ? "&" : "") + (query || "");
};

export const createUrl = (endpoint: string, query: string): string => `${endpoint}?${query}`;

export const createRequest = async <T>(
  endpoint: string,
  query: string,
  body?: object,
): Promise<T | ErrorStatus> => {
  const url = createUrl(endpoint, query);

  if (body) {
    const error = (await axios.post(url, body).catch(e => e)) as AxiosError;
    return error.code === "ERR_NETWORK" ? ErrorStatus.NO_INTERNET : ErrorStatus.NONE;
  }

  const response: T | AxiosError = await axios
    .get(url)
    .then(res => res.data as T)
    .catch(e => e);

  const error = response as AxiosError;

  if (error.code === "ERR_NETWORK") return ErrorStatus.NO_INTERNET;
  if (error.code === "ERR_BAD_REQUEST") return ErrorStatus.EMPTY;

  return response as T;
};
