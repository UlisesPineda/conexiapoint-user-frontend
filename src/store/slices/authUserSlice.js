import { createSlice } from '@reduxjs/toolkit';

export const authUserSlice = createSlice({
   name: 'authUser',
   initialState: {
      isLoading: true,
      user: [],
      dayPhrase: {
         phrase: 'Obteniendo la frase del día...',
         author: ''
      },
   },
   reducers: {
      onLogin: ( state, { payload } ) => {
         state.isLoading = false;
         state.user = payload;
      },
      onLogOut: ( state ) => {
         state.isLoading = true;
         state.user = [];
      },
      onPhraseLoaded: ( state, { payload } ) => {
         state.dayPhrase = payload;
      },
   },
});

export const { 
    onLogin,
    onLogOut, 
    onPhraseLoaded,
} = authUserSlice.actions;