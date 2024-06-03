import { saveLocalStorage } from "@/utils/helper";
import { ADD_WISHLIST, REMOVE_WISHLIST, CLEAR_WISHLIST } from "./action";
import { Action } from "./types";

const initialState: IMovie[] = [];

export const wishlistReducer = (
  state = initialState,
  action: Action
): IMovie[] => {
  switch (action.type) {
    case ADD_WISHLIST:
      if (!state.includes(action.payload)) {
        const newState = [action.payload, ...state];
        saveLocalStorage("wishlist", newState);
        return newState;
      }
      return state;
    case REMOVE_WISHLIST:
      const filteredMovies = state.filter(
        (movie) => movie.id !== action.payload
      );
      saveLocalStorage("wishlist", filteredMovies);
      return filteredMovies;
    case CLEAR_WISHLIST:
      localStorage.removeItem("wishlist");
      return [];
    default:
      return state;
  }
};
