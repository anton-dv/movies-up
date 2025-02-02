import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { SearchContextType } from "../context/types/SearchContextType";

export const useSearch = (): SearchContextType => {
  return [...useContext(AppContext).search];
};
