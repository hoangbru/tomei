import { Dispatch } from "react";
import {
  SET_MOVIE,
  ADD_MOVIE,
  REMOVE_MOVIE,
  UPDATE_MOVIE,
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  CLEAR_WISHLIST,
} from "@/store/action";

export type State = {
  movies: IMovie[];
  wishlist: IMovie[];
};

export type AppContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export type Action =
  | { type: typeof SET_MOVIE; payload: IMovie[] }
  | { type: typeof ADD_MOVIE; payload: IMovie }
  | { type: typeof REMOVE_MOVIE; payload: string | number }
  | { type: typeof UPDATE_MOVIE; payload: IMovie }
  | { type: typeof ADD_WISHLIST; payload: IMovie }
  | { type: typeof REMOVE_WISHLIST; payload: string | number }
  | { type: typeof CLEAR_WISHLIST }
