import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: "books",
    initialState: {
        booksList: [],
        booksObj: {},
    },
    reducers: {
         assingBooksIntoList:(state,action)=>{
            state.booksList=action.payload;
         },
        addBookToList: (state, action) => {
            // console.log(action.payload)
            state.booksList.push(action.payload);
        },
        removeBookFromList: (state, action) => {
            state.booksList=state.booksList.filter((book)=>book.id!=action.payload.id)
        },
        updateQuantityoFBook: (state, action) => {
            state.booksList = state.booksList.map((book) => {
                if (book.id === action.payload.id) {
                    return { ...book, quantity: action.payload.quantity };
                }
                return book;
            }).filter((book) => book.quantity > 0);
        }
    }
});

export const { addBookToList, removeBookFromList, updateQuantityoFBook , assingBooksIntoList} = booksSlice.actions;
export default booksSlice.reducer;
