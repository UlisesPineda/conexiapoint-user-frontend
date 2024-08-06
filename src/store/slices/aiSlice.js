import { createSlice } from '@reduxjs/toolkit';

export const aiSlice = createSlice({
   name: 'ai',
   initialState: {
      isFound: false,
      isBuyerperson: false,
      isPost: false,
      isEmailMarketing: false,
      queryResult: [],
      htmlPost: [],
   },
   reducers: {
      onSearchingAiData: ( state ) => {
         state.isSearching = true;
      },
      onSuccesfulSearch: ( state, { payload } ) => {
         state.queryResult = payload;
         state.isFound = true;
      },
      onSuccesfulBuyerPerson: ( state, { payload } ) => {
         state.queryResult = payload;
         state.isBuyerperson = true;
      },
      onSuccesfulPost: ( state, { payload } ) => {
         state.queryResult = payload.text;
         state.htmlPost = payload.post;
         state.isPost = true;
      },
      onSuccesfulEmail: ( state, { payload } ) => {
         state.queryResult = payload;
         state.isEmailMarketing = true;
      },
      onCleanSearch: ( state ) => {
         state.queryResult = [];
         state.htmlPost = [];
         state.isFound = false;
         state.isBuyerperson = false;
         state.isPost = false;
         state.isEmailMarketing = false;
      }
   }
});

export const { 
    onSearchingAiData,
    onSuccesfulSearch,
    onCleanSearch,
    onSuccesfulBuyerPerson,
    onSuccesfulPost,
    onSuccesfulEmail,
 } = aiSlice.actions;