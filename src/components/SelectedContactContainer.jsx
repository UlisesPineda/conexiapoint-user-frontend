import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles/SelectedContactContainer.css';
import { FormContact } from './FormContact';
import { useAlertMessage, useContactData, useForm } from '../hooks';

export const SelectedContactContainer = () => {

    const [hideContactModal, setHideContactModal] = useState( false );

    const { isConfirm } = useSelector( state => state.alertMessage );
    const { isContactEdit, contactSelected, contacts } = useSelector( state => state.contactData );

    const { startActivateMessage } = useAlertMessage();
    const { isDisabled, disableButtonForm, resetForm } = useForm();
    const { startCloseContactModal, startEditContact, startDeleteContact } = useContactData();    

    const initEditContact = () => {
        startEditContact();
    };
    
    const handleDeleteContact = () => {
        startActivateMessage({
            title: '¿Deseas eliminar el contacto actual?',
            message: '',
            isHidenButton: false,
            activeConfirm: true,
        });
    };

    const deleteContactState = () => {
        const contactsUpdated = contacts.filter( contact => contact._id !== contactSelected._id );
        return contactsUpdated;
    };

    const deleteContact = async( ) => {
        const updatedContacts = deleteContactState();
        disableButtonForm() &&
            await startDeleteContact( contactSelected._id, updatedContacts ) &&
                resetForm() & startCloseContactModal();
    };

    const handleCloseModal = () => {
        setHideContactModal( true );
        setTimeout(() => {
            startCloseContactModal();
        }, 300);
    };
    
    const firstMapsURL = `https://www.google.com/maps?q=${encodeURIComponent( contactSelected.adressOneContact )}`;
    const secondMapsURL = `https://www.google.com/maps?q=${encodeURIComponent( contactSelected.adressTwoContact )}`;

    useEffect(() => {
        isConfirm &&
            deleteContact();
    }, [ isConfirm ])
    

  return (
    <div
        className={`
            selected-contact-container
            ${ hideContactModal ? 'selected-contact-container-closed' : '' }
        `}
    >
        {
            !isContactEdit 
                ?
                    <div 
                        className='selected-contact-box' 
                    >
                        <div className="selected-contact-title">
                            <span className="title-label">
                                nombre:
                            </span>
                            <span className="title-text">
                                { contactSelected.nameContact }
                            </span>
                        </div>
                        <div className="selected-contact-title">
                            <span className="title-label">
                                empresa:
                            </span>
                            <span className="title-text">
                                { contactSelected.enterpriseContact }
                            </span>
                        </div>
                        <div className="selected-contact-notes">
                            <span className="contact-notes-label">Notas:</span>
                            <span className="contact-notes-text">
                                { contactSelected.notesContact }
                            </span>
                        </div>
                        <div className="selected-contact-adress">
                            <span className="contact-adress-label">Dirección 1:</span>
                            <span className="contact-adress-data">
                                { contactSelected.adressOneContact }
                            </span>
                            <a 
                                className="contact-adress-icon-container"
                                href={ firstMapsURL }
                                title='Consulta la dirección en maps'
                                target='_blank'
                                rel='noreferrer noopener'
                            >
                                <span
                                    className='contact-adress-icon map'
                                ></span>
                            </a>
                        </div>
                        <div className="selected-contact-adress">
                            <span className="contact-adress-label">Dirección 2:</span>
                            <span className="contact-adress-data">
                                { contactSelected.adressTwoContact }
                            </span>
                            <a 
                                className="contact-adress-icon-container"
                                href={ secondMapsURL }
                                title='Consulta la dirección en maps'
                                target='_blank'
                                rel='noreferrer noopener'
                            >
                                <span
                                    className='contact-adress-icon map'
                                ></span>
                            </a>
                        </div>
                        <div className="selected-contact-data">
                            <span className="data-box-container">
                                <span className="data-box-label">Correo 1:</span>
                                <span className="data-box-data">
                                    { contactSelected.emailOneContact }
                                </span>
                                <a 
                                    className="data-box-icon-container"
                                    href={ `mailto:${ contactSelected.emailOneContact }` }
                                    title='Enviar correo'
                                >
                                    <span
                                        className='data-box-icon email'
                                    ></span>
                                </a>
                            </span>
                        </div>
                        <div className="selected-contact-data">
                            <span className="data-box-container">
                                <span className="data-box-label">Correo 2:</span>
                                <span className="data-box-data">
                                    { contactSelected.emailTwoContact }
                                </span>
                                <a 
                                    className="data-box-icon-container"
                                    href={ `mailto:${ contactSelected.emailTwoContact }` }
                                    title='Enviar correo'
                                >
                                    <span
                                        className='data-box-icon email'
                                    ></span>
                                </a>
                            </span>
                        </div>
                        <div className="selected-contact-data">
                            <span className="data-box-container">
                                <span className="data-box-label">Teléfono 1:</span>
                                <span className="data-box-phone">
                                    <span>
                                        { contactSelected.phoneOneContact }
                                    </span>
                                </span>
                                <a 
                                    className="data-box-icon-container"
                                    href={ `tel:+52${ contactSelected.phoneOneContact }` }
                                    title='Realizar llamada'
                                    rel='noreferrer noopener nofollow'
                                >
                                    <span
                                        className='data-box-icon phone'
                                    ></span>
                                </a>
                                <a 
                                    className="data-box-icon-container"
                                    href={ `https://wa.me/1${ contactSelected.phoneOneContact }` }
                                    title='Enviar WhatsApp'
                                    rel='noreferrer noopener nofollow'
                                    target='_blank'
                                >
                                    <span
                                        className='data-box-icon whatsapp'
                                    ></span>
                                </a>
                            </span>
                        </div>
                        <div className="selected-contact-data">
                            <span className="data-box-container">
                                <span className="data-box-label">Teléfono 2:</span>
                                <span className="data-box-phone">
                                    <span>
                                        { contactSelected.phoneTwoContact }
                                    </span>
                                </span>
                                <a 
                                    className="data-box-icon-container"
                                    href={ `tel:+52${ contactSelected.phoneOneContact }` }
                                    title='Realizar llamada'
                                    rel='noreferrer noopener nofollow'
                                >
                                    <span
                                        className='data-box-icon phone'
                                    ></span>
                                </a>
                                <a 
                                    href={ `https://wa.me/1${ contactSelected.phoneTwoContact }` }
                                    className="data-box-icon-container"
                                    title='Enviar WhatsApp'
                                    rel='noreferrer noopener nofollow'
                                    target='_blank'
                                >
                                    <span
                                        className='data-box-icon whatsapp'
                                    ></span>
                                </a>
                            </span>
                        </div>
                        <div className="selected-contact-buttons">
                            <button 
                                className={
                                    `selected-contact-btn 
                                    ${ isDisabled ? 'form-button-disabled' : '' }`
                                }
                                onClick={ handleCloseModal }
                                disabled={ isDisabled }
                            >
                                cerrar
                            </button>
                            <button 
                                className={
                                    `selected-contact-btn 
                                    ${ isDisabled ? 'form-button-disabled' : '' }`
                                }
                                onClick={ handleDeleteContact }
                                disabled={ isDisabled }
                            >
                                eliminar
                            </button>
                            <button 
                                className={
                                    `selected-contact-btn 
                                    ${ isDisabled ? 'form-button-disabled' : '' }`
                                }
                                onClick={ initEditContact }
                                disabled={ isDisabled }
                            >
                                editar
                            </button>
                        </div>
                    </div>    
                :
                    <FormContact 
                        handleCloseModal={ handleCloseModal }
                    />
        }
    </div>
  );
};
