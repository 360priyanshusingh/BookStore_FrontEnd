import { createSlice } from "@reduxjs/toolkit";

const wishListbooksSlice = createSlice({
    name: "wishListBooks",
    initialState: {
        wishListBooksList: [],
        wishListBooksObj: {},
    },
    reducers: {
         assingBooksIntoWishList:(state,action)=>{
            state.wishListBooksList=action.payload;
            console.log(state.wishListBooksList)
         },
        addBookToWishList: (state, action) => {
            state.wishListBooksList.push(action.payload);
        },
        removeBookFromWishList: (state, action) => {
            state.wishListBooksList=state.wishListBooksList.filter((book)=>book.id!=action.payload.id)
        }
    }
});

export const { addBookToWishList, removeBookFromWishList, assingBooksIntoWishList} = wishListbooksSlice.actions;
export default wishListbooksSlice.reducer;
