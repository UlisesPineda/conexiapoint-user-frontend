import { configureStore } from '@reduxjs/toolkit';
import { 
    alertMessageSlice, 
    authUserSlice, 
    contactDataSlice,
    eventDataSlice
} from './slices';

export const store = configureStore({
    reducer: {
        alertMessage: alertMessageSlice.reducer,
        authUser: authUserSlice.reducer,
        contactData: contactDataSlice.reducer,
        eventData: eventDataSlice.reducer,
    },
});