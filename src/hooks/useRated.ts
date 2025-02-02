import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { RatedContextType } from "../context/types/RatedContextType";

export const useRated = (): RatedContextType => {
  return [...useContext(AppContext).rated];
};
