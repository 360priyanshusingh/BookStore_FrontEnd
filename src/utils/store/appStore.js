import { configureStore } from "@reduxjs/toolkit";
import booksSlice from './booksSlice.js'
import wishListbooksSlice from "./wishListBooksSlice.js";
import querySearchSlice from "./querySearch.js"
const appStore = configureStore({
    reducer:{
        books:booksSlice,
        wishListBooks:wishListbooksSlice,
        querySearch:querySearchSlice,
    }
})

export default appStore ;