import { createSlice } from '@reduxjs/toolkit';

export const contactDataSlice = createSlice({
   name: 'contactData',
   initialState: {
      isContactSelected: false,
      isContactEdit: false,
      isContactAdd: false,
      isContactFound: false,
      contactSelected: [],
      contacts: [],
   },
   reducers: {
      onGettedContacts: ( state, { payload } ) => {
         state.contacts = payload;
      },
      onSearchContacts: ( state, { payload } ) => {
         state.isContactFound = true;
         state.contacts = payload;
      },      
      onSelectedContact: ( state, { payload } ) => {
         state.isContactSelected = true;
         state.contactSelected = payload;
      },
      onUpdateContacts: ( state, { payload } ) => {
         state.contacts = [ payload, ...state.contacts ];
      },
      onEditContact: ( state ) => {
         state.isContactEdit = true;
      },
      onAddContact: ( state ) => {
         state.isContactAdd = true;
      },
      onCloseContactModal: ( state ) => {
        state.isContactSelected = false;
        state.isContactEdit = false;
        state.isContactAdd = false;
        state.contactSelected = {};
      },
   }
});

export const { 
   onGettedContacts,
   onSearchContacts,
   onSelectedContact,
   onUpdateContacts,
   onEditContact,
   onAddContact,
   onCloseContactModal,
} = contactDataSlice.actions;