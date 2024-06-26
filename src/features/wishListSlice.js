import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //for when we need to grab the state.property.  state name is what gets set up in our store.
  // property is one of the following

  // wishList.wishList
  wishList: [],
  // wishList.totalItems
  totalItems: 0,
};

export const wishListSlice = createSlice({
  name: "wish list",
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log("Add Item Reducer");
      // console.log(action.payload)

      const movie = action.payload;
      /* create a new state that takes in:
                previous state: ...state
                item we want to add: movie
                *** can't use push because we aren't allowed to modify the existing array.  
                instead, we want to make a copy that also includes our new movie
            */
      const existingItem = state.wishList.find((item) => item.id === movie.id);

      if (!existingItem) {
        const newState = [...state.wishList, movie];
        // update our old state
        state.wishList = newState;
        state.totalItems = state.wishList.length;
        console.log(state.wishList);
      }
    },
    deleteItem: (state, action) => {
      console.log("Delete Item Reducer");
      const id = action.payload;
      // filter out the movie whose id is the same as our payload
      const newState = state.wishList.filter((movie) => movie.id !== id)
      state.wishList = newState;
      state.totalItems = state.wishList.length;
      console.log(state.wishList);
    },
  },
});

export const { addItem, deleteItem } = wishListSlice.actions;

export default wishListSlice.reducer;
