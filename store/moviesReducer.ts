import { SET_MOVIE, ADD_MOVIE, REMOVE_MOVIE, UPDATE_MOVIE } from "./action";
import { Action } from "./types";

const initialState: IMovie[] = [];

export const moviesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_MOVIE:
      return { ...state, movies: action.payload };
    case ADD_MOVIE:
      if (!state.includes(action.payload)) {
        state.unshift(action.payload);
      }
      localStorage.setItem("movies", JSON.stringify(state));
      return { ...state };
    case REMOVE_MOVIE:
      const newMovies = state.filter((movie) => movie.id !== action.payload);
      localStorage.setItem("movies", JSON.stringify(newMovies));
      return {
        ...state,
        movies: newMovies,
      };
    case UPDATE_MOVIE:
      const updatedMovies = state.map((movie) =>
        movie.id === action.payload.id ? action.payload : movie
      );
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
      return { ...state, movies: updatedMovies };
    default:
      return state;
  }
};
