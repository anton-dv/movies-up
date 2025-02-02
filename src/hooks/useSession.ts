import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { SessionContextType } from "../context/types/SessionContextType";

export const useSession = (): SessionContextType => {
  return [...useContext(AppContext).session];
};
