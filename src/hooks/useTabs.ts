import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { TabsContextType } from "../context/types/TabsContextType";

export const useTabs = (): TabsContextType => {
  return [...useContext(AppContext).tabs];
};
