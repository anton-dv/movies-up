import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { QueryContextType } from "../context/types/QueryContextType";

export const useQuery = (): QueryContextType => {
  return [...useContext(AppContext).query];
};
