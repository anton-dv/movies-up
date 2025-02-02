import { createContext } from "react";

import { TabMode } from "../types/TabMode";
import { TabsContextType } from "./types/TabsContextType";
import { QueryContextType } from "./types/QueryContextType";
import { RatedContextType } from "./types/RatedContextType";
import { SearchContextType } from "./types/SearchContextType";

export type AppContextType = {
  tabs: TabsContextType;
  query: QueryContextType;
  search: SearchContextType;
  rated: RatedContextType;
};

export const AppContext = createContext<AppContextType>({
  search: [undefined, () => {}],
  rated: [undefined, () => {}],
  tabs: [TabMode.Search, () => {}],
  query: ["", () => {}],
});
