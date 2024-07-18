import { useDispatch } from "react-redux";

import { onLogin, onLogOut } from "../store/slices";
import { conexiaPointAPI } from "../api/conexiaPointAPI";

export const useAuthUser = () => {

    const dispatch = useDispatch();

    const onStartLoadUserPage = async( token ) => {
        try {
            const { data } = await conexiaPointAPI.post( '/auth/get-user-interface', { token } );
            dispatch( onLogin( data ) );
        } catch (error) {
            console.log( error );
            dispatch( onLogOut() );
            document.cookie = `auth-token=; max-age=0`;
            window.location.href = `${ import.meta.env.VITE_MAIN_SITE_URL }/entrar`;
        }
    };

    const onStartLogout = () => {
        dispatch( onLogOut() );
        document.cookie = `auth-token=; max-age=0`;
        window.location.href = `${ import.meta.env.VITE_MAIN_SITE_URL }/entrar`;
    };

    const onRenewToken = async() => {
        try {
            const { data } = await conexiaPointAPI.get( '/auth/renew-token' );
            document.cookie = `auth-token=${ data.token }; 'max-age=1800; domain=.conexiapoint.com; path=/; samesite=none; secure`;
        } catch (error) {
            console.log( error );
            dispatch( onLogOut() );
            document.cookie = `auth-token=; max-age=0`;
            window.location.href = `${ import.meta.env.VITE_MAIN_SITE_URL }/entrar`;
        }
    };

    return {
        onStartLoadUserPage,
        onStartLogout,
        onRenewToken,
    };
};