import { createSlice } from '@reduxjs/toolkit';

export const eventDataSlice = createSlice({
   name: 'eventData',
   initialState: {
      isFormEventActive: false,
      isAddEvent: false,
      isEditEvent: false,
      eventType: 'del día',
      eventSelected: [],
      events: []
   },
   reducers: {
      onGettedEvents: ( state, { payload } ) => {
         state.events = payload;
      },
      onUpdateEvents: ( state, { payload } ) => {
         state.events = [ payload, ...state.events ];
      },
      onAddEvent: ( state ) => {
         state.isFormEventActive = true;
         state.isAddEvent = true;
      },
      onEditEvent: ( state, { payload } ) => {
         state.isFormEventActive = true;
         state.isEditEvent = true;
         state.eventSelected = payload;
      },
      onSelectEvent: ( state, { payload } ) => {
         state.eventType = payload;
      },
      onCloseEventForm: ( state ) => {
         state.isFormEventActive = false;
         state.isAddEvent = false;
         state.isEditEvent = false;
         state.eventSelected = {};
      },
   }
});

export const { 
   onGettedEvents,
   onUpdateEvents,
   onAddEvent,
   onEditEvent,
   onCloseEventForm,
   onSelectEvent,
} = eventDataSlice.actions;