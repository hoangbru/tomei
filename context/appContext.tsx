import { createContext, useReducer, ReactNode } from "react";

import { rootReducer } from "@/store/combineReducer";
import { AppContextType, State } from "@/store/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: State = {
  movies: [],
  wishlist: [],
};

function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
