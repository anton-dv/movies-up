import { FC, useState } from "react";

import { TabMode } from "../types/TabMode";
import { AppContext } from "./AppContext";
import { PageValue } from "../api/types/PageValue";

export type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const value = {
    session: useState<string | undefined>(undefined),
    search: useState<PageValue>(undefined),
    rated: useState<PageValue>(undefined),
    tabs: useState(TabMode.Search),
    query: useState(""),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
