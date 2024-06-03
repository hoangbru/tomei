import { ADD_WISHLIST, REMOVE_WISHLIST, UPDATE_WISHLIST } from "./action";
import { Action } from "./types";

const initialState: IMovie[] = []

export const wishlistReducer = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case ADD_WISHLIST:
      const newMovie = action.payload;
      if (!state.includes(newMovie)) {
        state.push(newMovie);
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
      return { ...state };
    case REMOVE_WISHLIST:
      const newWishlist = state.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return { ...state, wishlist: newWishlist };
    case UPDATE_WISHLIST:
      localStorage.setItem("wishlist", JSON.stringify(state));
      return { ...state };
    default:
      return state;
  }
};
