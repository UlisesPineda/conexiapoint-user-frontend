import { createSlice } from '@reduxjs/toolkit';

export const alertMessageSlice = createSlice({
   name: 'alertMessage',
   initialState: {
      isActiveMessage: false,
      isHidenButton: false,
      activeConfirm: false,
      isConfirm: false,
      title: '',
      message: '',
   },
   reducers: {
      onActivateMessage: ( state, { payload } ) => {
         state.isActiveMessage = true;
         state.activeConfirm = payload.activeConfirm;
         state.title = payload.title;
         state.message = payload.message;
         state.isHidenButton = payload.isHidenButton;
      },
      onDesactivateMessage: ( state ) => {
         state.isActiveMessage = false;
         state.isHidenButton = false;
         state.title = '';
         state.message = '';
      },
      onConfirmActions: ( state ) => {
         state.activeConfirm = true;
         state.isConfirm = true;
      },
      onRejectActions: ( state ) => {
         state.activeConfirm = false;
         state.isConfirm = false;
      },
   },
});

export const { 
    onActivateMessage,
    onDesactivateMessage,
    onConfirmActions,
    onRejectActions,
 } = alertMessageSlice.actions;