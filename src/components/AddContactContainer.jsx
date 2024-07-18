import { useState } from 'react';
import { useSelector } from 'react-redux';

import './styles/AddContactContainer.css';
import { FormContact } from './FormContact';
import { useContactData } from '../hooks';

export const AddContactContainer = () => {

    const { isContactAdd } = useSelector( state => state.contactData );

    const [hideModal, setHideModal] = useState( false );

    const { startCloseContactModal } = useContactData();    

    const handleCloseModal = () => {
        setHideModal( true );
        setTimeout(() => {
            startCloseContactModal();
        }, 300);
    };       

  return (
    <div
        className={`
            add-contact-container
            ${ isContactAdd ? 'add-contact-container-active' : '' }
            ${ hideModal ? 'add-contact-container-closed' : '' }
        `}
    >
        <FormContact 
            handleCloseModal={ handleCloseModal }
        />
    </div>
  );
};