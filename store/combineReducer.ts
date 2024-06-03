import { Reducer } from "react";
import { Action, State } from "./types";
import { moviesReducer } from "./moviesReducer";
import { wishlistReducer } from "./wishlistReducer";

export const combineReducers = <
  T extends { [key: string]: any },
  A extends Action
>(reducers: { [K in keyof T]: Reducer<T[K], A> }) => {
  return (state: T, action: A): T => {
    const newState: T = {} as T;
    Object.keys(reducers).forEach((key: keyof T) => {
      const typedKey = key as keyof T;
      newState[typedKey] = reducers[key](state[typedKey], action);
    });
    return newState;
  };
};

export const rootReducer = combineReducers<State, Action>({
  movies: moviesReducer,
  wishlist: wishlistReducer,
});
