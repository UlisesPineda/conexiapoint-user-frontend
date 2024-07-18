import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './styles/FormContact.css';
import { useContactData, useForm, useValidateForm } from '../hooks';

export const FormContact = ({ handleCloseModal }) => {

    const { isContactEdit, contactSelected } = useSelector( state => state.contactData );

    const { validateAddContactForm } = useValidateForm();
    const { startCreateContact, startCloseContactModal, startSaveEditedContact } = useContactData();
    const { 
        form, 
        handleChange, 
        setForm, 
        resetForm,
        isDisabled,
        disableButtonForm,
        enableButtonForm,
    } = useForm({
        nameContact: '',
        enterpriseContact: '',
        notesContact: '',
        adressOneContact: '',
        adressTwoContact: '',
        emailOneContact: '',
        emailTwoContact: '',
        phoneOneContact: '',
        phoneTwoContact: '',
    });
    const { 
        nameContact, 
        enterpriseContact, 
        notesContact, 
        adressOneContact, 
        adressTwoContact, 
        emailOneContact, 
        emailTwoContact, 
        phoneOneContact, 
        phoneTwoContact, 
    } = form;

    const handleCreateContact = async(e) => {
        e.preventDefault();
        validateAddContactForm( form ) &&
            disableButtonForm() &&
                await startCreateContact( form ) ?
                    resetForm() & startCloseContactModal() :
                        enableButtonForm();
    };
        
    const handleEditContact = async(e) => {
        e.preventDefault();
        validateAddContactForm( form ) &&
            disableButtonForm() &&
                await startSaveEditedContact( form, contactSelected._id ) &&
                    resetForm() & startCloseContactModal();
    };

    useEffect(() => {
        if (contactSelected) {
            setForm({
                nameContact: contactSelected.nameContact || '',
                enterpriseContact: contactSelected.enterpriseContact || '',
                notesContact: contactSelected.notesContact || '',
                adressOneContact: contactSelected.adressOneContact || '',
                adressTwoContact: contactSelected.adressTwoContact || '',
                emailOneContact: contactSelected.emailOneContact || '',
                emailTwoContact: contactSelected.emailTwoContact || '',
                phoneOneContact: contactSelected.phoneOneContact || '',
                phoneTwoContact: contactSelected.phoneTwoContact || '',
            });
        } else {
            setForm({
                nameContact: '',
                enterpriseContact: '',
                notesContact: '',
                adressOneContact: '',
                adressTwoContact: '',
                emailOneContact: '',
                emailTwoContact: '',
                phoneOneContact: '',
                phoneTwoContact: '',
            });
        }
    }, [ isContactEdit ]);

  return (
    <form
        className='form-contact-box'
        onSubmit={ isContactEdit ? handleEditContact : handleCreateContact }
    >
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="nameContact" 
                    className="form-box-label form-box-label-main"
                >Nombre: </label>
                <input 
                    type="text" 
                    id='nameContact'
                    name='nameContact'
                    className="form-box-input" 
                    placeholder='Requerido'
                    value={ nameContact }
                    onChange={ handleChange }
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="enterpriseContact" 
                    className="form-box-label"
                >Empresa:</label>
                <input 
                    type="text" 
                    id='enterpriseContact'
                    name='enterpriseContact'
                    className="form-box-input"
                    value={ enterpriseContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="notesContact" 
                    className="form-box-label"
                >Notas:</label>
                <textarea 
                    id='notesContact'
                    name='notesContact'
                    className="form-box-input form-box-textarea" 
                    value={ notesContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="adressOneContact" 
                    className="form-box-label"
                >Dirección:</label>
                <input 
                    type="text" 
                    id='adressOneContact'
                    name='adressOneContact'
                    className="form-box-input" 
                    value={ adressOneContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="adressTwoContact" 
                    className="form-box-label"
                >Dirección adicional:</label>
                <input 
                    type="text" 
                    id='adressTwoContact'
                    name='adressTwoContact'
                    className="form-box-input" 
                    value={ adressTwoContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="emailOneContact" 
                    className="form-box-label form-box-label-main"
                >Correo principal: </label>
                <input 
                    type="text" 
                    id='emailOneContact'
                    name='emailOneContact'
                    className="form-box-input" 
                    placeholder='Requerido'
                    value={ emailOneContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="emailTwoContact" 
                    className="form-box-label"
                >Correo adicional:</label>
                <input 
                    type="text" 
                    id='emailTwoContact'
                    name='emailTwoContact'
                    className="form-box-input" 
                    value={ emailTwoContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="phoneOneContact" 
                    className="form-box-label form-box-label-main"
                >Teléfono principal: </label>
                <input 
                    type="text" 
                    id='phoneOneContact'
                    name='phoneOneContact'
                    className="form-box-input" 
                    placeholder='Requerido'
                    value={ phoneOneContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-data">
            <span className="form-box-container">
                <label 
                    htmlFor="phoneTwoContact" 
                    className="form-box-label"
                >Teléfono adicional:</label>
                <input 
                    type="text" 
                    id='phoneTwoContact'
                    name='phoneTwoContact'
                    className="form-box-input" 
                    value={ phoneTwoContact }
                    onChange={ handleChange } 
                />
            </span>
        </div>
        <div className="form-contact-buttons">
            <button 
                className={
                    `form-contact-btn ${ isDisabled ? 'form-button-disabled' : '' }`
                }
                onClick={ handleCloseModal }
                type='button'
                disabled={ isDisabled }
            >
                cancelar
            </button>
            <button 
                className={
                    `form-contact-btn ${ isDisabled ? 'form-button-disabled' : '' }`
                }
                type='submit'
                disabled={ isDisabled }
            >
                { isContactEdit ? 'editar contacto' : 'crear contacto' }
            </button>
        </div>
    </form>
  );
};

FormContact.propTypes = {
    handleCloseModal: PropTypes.func,
};
