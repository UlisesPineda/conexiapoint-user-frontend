import { useDispatch } from "react-redux";
import { conexiaPointAPI } from "../api/conexiaPointAPI";
import { useAlertMessage } from "./useAlertMessage";
import { onLogin } from "../store/slices";
import { uploadAvatarFirebase } from "../firebase/config";

export const useSettingsUser = () => {

    const { startActivateMessage } = useAlertMessage();
    const dispatch = useDispatch();

    const onChangeUserName = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.put( '/settings/change-username', form );
            dispatch( onLogin( data ) );
            startActivateMessage({
                title: 'El nombre de usuario se ha actualizado exitosamente',
                message: `Tu nuevo nombre de usuario es: ${ data.user }`,
                isHidenButton: false,
            });
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
                    title: 'Hubo un error al editar el nombre de usuario',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const onChangeUserEnterprise = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.put( '/settings/change-enterprise', form );
            dispatch( onLogin( data ) );
            startActivateMessage({
                title: 'El nombre de empresa se ha actualizado exitosamente',
                message: `Tu nuevo nombre de empresa es: ${ data.enterprise }`,
                isHidenButton: false,
            });
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
                    title: 'Hubo un error al editar el nombre de empresa',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const onChangeUserEmail = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.put( '/settings/change-email', form );
            dispatch( onLogin( data ) );
            startActivateMessage({
                title: 'El correo se ha actualizado exitosamente',
                message: `Tu nuevo usuario para inicio de sesión es: ${ data.email }`,
                isHidenButton: false,
            });
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
                    title: 'Hubo un error al editar el nombre de empresa',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const onChangeUserPassword = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.put( '/settings/change-password', form );
            dispatch( onLogin( data ) );
            startActivateMessage({
                title: 'El password se ha actualizado exitosamente',
                message: 'Actualiza tu password en el próximo inicio de sesión',
                isHidenButton: false,
            });
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
                    title: 'Hubo un error al cambiar el password',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    const onChangeUserAvatar = async( img, id ) => {
        try {
            const firebaseImgUrl = await uploadAvatarFirebase( img, id );
            const { data } = await conexiaPointAPI.put( '/settings/change-avatar', { urlImage: firebaseImgUrl } );
            dispatch( onLogin( data ) ); 
            startActivateMessage({
                title: 'La imagen fue actualizada exitosamente',
                message: 'Tu nuevo avatar ya está disponible',
                isHidenButton: false,
            });
            return true;
        } catch (error) {
            console.log( error );
            startActivateMessage({
                title: 'La imagen solo acepta imágenes en formato PNG o JPG y no debe pesar más de un mega (1024 kb)',
                message: 'Corrige el formato de tu imagen',
                isHidenButton: false,
            });
            return false;
        }
    };

    return {
        onChangeUserName,
        onChangeUserEnterprise,
        onChangeUserEmail,
        onChangeUserPassword,
        onChangeUserAvatar,
    };
};