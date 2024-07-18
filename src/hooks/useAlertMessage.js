import { useDispatch } from "react-redux";
import { onActivateMessage, onDesactivateMessage, onConfirmActions, onRejectActions, } from "../store/slices";

export const useAlertMessage = () => {
    const dispatch = useDispatch();

    const startActivateMessage = ( title, message, isHidenButton, activeConfirm ) => {
        dispatch( onActivateMessage( title, message, isHidenButton, activeConfirm ) );
    };

    const startDesactivateMessage = (  ) => {
        dispatch( onDesactivateMessage() );
    };

    const setConfirmAction =() => {
        dispatch( onConfirmActions() );
    };

    const setRejectAction = () => {
        dispatch( onRejectActions() );
    };

    return {
        startActivateMessage,
        startDesactivateMessage,
        setConfirmAction,
        setRejectAction,
    };
};