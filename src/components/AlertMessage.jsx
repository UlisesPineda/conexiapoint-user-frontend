import { useState } from 'react';
import { useSelector } from 'react-redux';

import './styles/AlertMessage.css';
import { useAlertMessage } from '../hooks';

export const AlertMessage = () => {

    const { 
        title, 
        message, 
        isHidenButton, 
        activeConfirm, 
        isActiveMessage, 
    } = useSelector( state => state.alertMessage );
    const { 
        startDesactivateMessage, 
        setConfirmAction, 
        setRejectAction,
    } = useAlertMessage();
    
    const [hidenMessage, setHidenMessage] = useState( false );

    const handleCloseMessage = () => {
        setHidenMessage( true );
        setTimeout(() => {
            startDesactivateMessage();
            activeConfirm && setConfirmAction();
        }, 300);
    };

    const rejectConfirm = () => {
        setHidenMessage( true );
        setTimeout(() => {
            startDesactivateMessage();
            setRejectAction();            
        }, 300);
    };

  return (
    <div
        className={`
            alert-message 
            ${ hidenMessage ? 'alert-message-hide' : '' }
        `}
    >
        <div 
            className={`
                message-container
                ${ isActiveMessage ? 'message-container-active' : '' }
                ${ hidenMessage ? 'message-container-hide' : '' }
            `}
        >
            <big> { title } </big>
            <p> { message } </p>
            <div className="alert-message-buttons-container">
                {
                    activeConfirm && 
                        <button
                            className={ isHidenButton ? 'hide-button' : '' }
                            onClick={ rejectConfirm }
                        >
                            cancelar
                        </button>
                }
                <button
                    className={ isHidenButton ? 'hide-button' : '' }
                    onClick={ handleCloseMessage }
                >
                    { activeConfirm ? 'eliminar' : 'Ok' }
                </button>
            </div>
        </div>
    </div>
  );
};

