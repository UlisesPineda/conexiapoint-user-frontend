import { useDispatch } from "react-redux";

import { useAlertMessage } from "./useAlertMessage";
import { 
    onCloseContactModal, 
    onSearchContacts,
    onSelectedContact,
    onUpdateContacts,
    onEditContact,
    onAddContact,
    onGettedContacts,
} from "../store/slices";
import { conexiaPointAPI } from "../api/conexiaPointAPI";

export const useContactData = () => {

    const dispatch = useDispatch();
    const { startActivateMessage, setRejectAction } = useAlertMessage();

    const startGetContacts = async() => {
        try {
            const { data } = await conexiaPointAPI.get( '/contacts/get-contacts' );
            dispatch( onGettedContacts( data.contacts ) );
        } catch (error) {
            console.log( error );
        }
    };

    const startSearchContact = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.post( '/contacts/search-contact', form );
            dispatch( onSearchContacts(data.contacts) );
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
                    title: 'Hubo un error al realizar la búsqueda',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const startCreateContact = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.post( '/contacts/create-contact', form );
            dispatch( onUpdateContacts( data.contacto ) );
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
                    title: 'Hubo un error al crear el contacto',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    } ;

    const startSaveEditedContact = async( form, id ) => {
        try {
            const { data } = await conexiaPointAPI.put( `/contacts/edit-contact/${ id }`, form );
            await startGetContacts();
            startActivateMessage({
                title: data.message,
                message: data.text,
                isHidenButton: false,
            });
            return true;
        } catch (error) {
            startActivateMessage({
                title: 'Hubo un error al crear el contacto',
                message: 'Intenta más tarde',
                isHidenButton: false,
            });
            return false;
        }
    };

    const startDeleteContact = async( id , contacts ) => {
        try {
            await conexiaPointAPI.delete( `/contacts/delete-contact/${ id }` );
            dispatch( onGettedContacts( contacts ) );
            setRejectAction();
            return true;
        } catch (error) {
            startActivateMessage({
                title: 'Hubo un error al eliminar el contacto',
                message: 'Intenta más tarde',
                isHidenButton: false,
            });
            return false;
        }
    };

    const startSelectContact = ( contact ) => {
        dispatch( onSelectedContact( contact ) );
    };

    const startEditContact = () => {
        dispatch( onEditContact() );
    };

    const startAddContact = () => {
        dispatch( onAddContact() );
    };

    const startCloseContactModal = () => {
        dispatch( onCloseContactModal() );
    };

    return {
        startGetContacts,
        startSearchContact,
        startCreateContact,
        startSaveEditedContact,
        startDeleteContact,
        startSelectContact,
        startCloseContactModal,
        startEditContact,
        startAddContact,
    };
};