import { saveLocalStorage } from "@/utils/helper";
import { SET_MOVIE, ADD_MOVIE, REMOVE_MOVIE, UPDATE_MOVIE } from "./action";
import { Action } from "./types";

const initialState: IMovie[] = [];

export const moviesReducer = (
  state = initialState,
  action: Action
): IMovie[] => {
  switch (action.type) {
    case SET_MOVIE:
      const settedState = [...state, ...action.payload];
      saveLocalStorage("movies", settedState);
      return settedState;
    case ADD_MOVIE:
      if (!state.includes(action.payload)) {
        const newState = [action.payload, ...state];
        saveLocalStorage("movies", newState);
        return newState;
      }
      return state;
    case REMOVE_MOVIE:
      const filteredMovies = state.filter(
        (movie) => movie.id !== action.payload
      );
      saveLocalStorage("movies", filteredMovies);
      return filteredMovies;
    case UPDATE_MOVIE:
      const updatedMovies = state.map((movie) =>
        movie.id === action.payload.id ? action.payload : movie
      );
      saveLocalStorage("movies", updatedMovies);
      return updatedMovies;
    default:
      return state;
  }
};
