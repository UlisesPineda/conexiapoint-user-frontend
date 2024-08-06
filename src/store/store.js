import { configureStore } from '@reduxjs/toolkit';
import { 
    aiSlice,
    alertMessageSlice, 
    authUserSlice, 
    contactDataSlice,
    eventDataSlice
} from './slices';

export const store = configureStore({
    reducer: {
        alertMessage: alertMessageSlice.reducer,
        contactData: contactDataSlice.reducer,
        eventData: eventDataSlice.reducer,
        authUser: authUserSlice.reducer,
        ai: aiSlice.reducer,
    },
});