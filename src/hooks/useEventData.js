import { useDispatch } from "react-redux";
import { 
    onAddEvent, 
    onCloseEventForm, 
    onEditEvent, 
    onSelectEvent, 
    onGettedEvents ,
    onUpdateEvents,
} from "../store/slices";
import { useAlertMessage } from "./useAlertMessage";
import { conexiaPointAPI } from "../api/conexiaPointAPI";

export const useEventData = () => {

    const dispatch = useDispatch();
    const { startActivateMessage, setRejectAction } = useAlertMessage();

    const startAddEvent = () => {
        dispatch( onAddEvent() );
    };

    const startEditEvent = ( eventSelected ) => {
        dispatch( onEditEvent( eventSelected ) );
    };

    const startCloseEventForm = () => {
        dispatch( onCloseEventForm() );
    };

    const startSelectEvent = ( eventType ) => {
        dispatch( onSelectEvent( eventType ) )
    };

    const startGetEvents = async() => {
        try {
            const { data } = await conexiaPointAPI.get( '/events/get-events' );
            dispatch( onGettedEvents( data.events ) );
        } catch (error) {
            if( error.response.status === 404 ){
                startActivateMessage({
                    title: error.response.data.message,
                    message: error.response.data.text,
                    isHidenButton: false,
                });
                return false;
            }
            else {
                startActivateMessage({
                    title: 'Hubo un error al crear el evento',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const createEvent = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.post( '/events/create-event', form );
            dispatch( onUpdateEvents( data.event ) );
            return true;
        } catch (error) {
            if( error.response.status === 400 ){
                startActivateMessage({
                    title: error.response.data.message,
                    message: error.response.data.text,
                    isHidenButton: false,
                });
                return false;
            }
            else {
                startActivateMessage({
                    title: 'Hubo un error al crear el evento',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const editEvent = async( id, form ) => {
        try {
            await conexiaPointAPI.put( `/events/update-event/${ id }`, form );
            await startGetEvents();
            return true;
        } catch (error) {
            if( error.response.status === 404 ){
                startActivateMessage({
                    title: error.response.data.message,
                    message: error.response.data.text,
                    isHidenButton: false,
                });
                return false;
            }
            else {
                startActivateMessage({
                    title: 'Hubo un error al editar el evento',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const deleteEvent = async( id, events ) => {
        try {
            await conexiaPointAPI.delete( `/events/delete-event/${ id }` );
            dispatch( onGettedEvents( events ) );
            setRejectAction();
            return true;
        } catch (error) {
            console.log( error );
            startActivateMessage({
                title: 'Hubo un error al crear el evento',
                message: 'Intenta más tarde',
                isHidenButton: false,
            });
            return false;
        }
    };

    return {
        startAddEvent,
        startEditEvent,
        startCloseEventForm,
        startSelectEvent,
        startGetEvents,
        createEvent,
        editEvent,
        deleteEvent,
    };
};