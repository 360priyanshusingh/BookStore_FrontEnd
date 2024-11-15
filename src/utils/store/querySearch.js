import { createSlice } from "@reduxjs/toolkit";

const querySearchSlice = createSlice({
    name: "querySearch",
    initialState: {
        querySearchString: "",
    },
    reducers: {
         assingWordsIntoQuerySearch:(state,action)=>{
            state.querySearchString=action.payload;
         },
        addWordToQuerySearch: (state, action) => {
            state.querySearchString.push(action.payload);
        },
        removeAllWordsFromQuerySearch: (state) => {
            state.querySearchString="";
        }
    }
});

export const { addWordToQuerySearch, removeAllWordsFromQuerySearch  , assingWordsIntoQuerySearch} = querySearchSlice.actions;
export default querySearchSlice.reducer;
