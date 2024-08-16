// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles/DashboardContactsPage.css';

import { useAuthUser, useContactData, useForm, useValidateForm } from '../hooks';
import { AddContactContainer, SelectedContactContainer } from '../components';
import { useEffect } from 'react';

export const DashboardContactsPage = () => {

  const { 
    isContactSelected, 
    isContactAdd, 
    isContactFound, 
    contacts,
  } = useSelector( state => state.contactData );

  const { form, handleChange, resetForm } = useForm({ queryContact: '' });
  const { 
    startSearchContact, 
    startSelectContact, 
    startAddContact,
  } = useContactData();
  const { validateEmptyInput, validateName  } = useValidateForm();
  const { onRenewToken } = useAuthUser();
  const { queryContact } = form;

  const handleSearchContact = (e) => {
    e.preventDefault();
    validateEmptyInput( { queryContact }, 'Ingresa el nombre del contacto o de la empresa' ) &&
      validateName( form.queryContact ) &&
        startSearchContact( form ) & resetForm();
  };

  const handleSelectedContact = (e)=> {
    const contactId = e.currentTarget.getAttribute('data-contact-id');
    const contactSel = contacts.filter( contact => contact._id === contactId );
    startSelectContact( contactSel[0] );
  };
  
  const handleAddContact = () => {
    startAddContact();
  };
  
  useEffect(() => {
    onRenewToken();
  }, []);
  

  return (
    <main>
      <section className="contacts-container">
        <div className="contact-block-container">
          <h1>Contactos</h1>
          <div className="contact-input-container">
            <form
              className='contact-search-form'
              onSubmit={ handleSearchContact }
            >
              <label htmlFor="queryContact"> <big>Buscar contactos</big> <small>(Busca el nombre del contacto o la empresa)</small> </label>
              <span className='line-block'></span>
              <div className="input-search-container">
                <input 
                  type="text" 
                  name='queryContact'
                  id='queryContact'
                  value={ form.queryContact }
                  onChange={ handleChange }
                />
                <button 
                  className="search"
                  type='submit'
                  title='Realizar búsqueda'
                ></button>
              </div>
            </form>
          </div>
          <div className="contact-result-container">
            <big> 
              { 
                contacts.length 
                  ? 
                    isContactFound 
                      ? 'Resultado de la búsqueda' 
                      : 'Últimos contactos agregados'
                  : 
                    isContactFound 
                      ? 'No se encontraron resultados para tu búsqueda'
                      : 'Aún no tienes contactos agregados'
              } 
            </big>
            <span className="line-block"></span>
            <div 
              className="data-headers-container"
              onClick={ handleSelectedContact }
            >
              <em>nombre:</em>
              <em>teléfono:</em>
              <em>correo:</em>
              <em>empresa:</em>
            </div>
            { 
              contacts.length
                ? contacts?.map(
                  ( contact ) => {
                    return(
                      <div 
                        className="data-contact-container"
                        onClick={ handleSelectedContact }
                        data-contact-id={ contact._id }
                        title='Da clic para ver más detalles'
                        key={ contact._id }
                      >
                        <span> { contact.nameContact } </span>
                        <span> { contact.phoneOneContact } </span>
                        <span> { contact.emailOneContact } </span>
                        <span> { contact.enterpriseContact } </span>
                      </div>
                    )
                  }
                )  
                : ''
            }
          </div>
        </div>
        <button
          className='add-contact-button'
          onClick={ handleAddContact }
          title='Agregar nuevo contacto'
        >
          +
        </button>
      </section>
      {
        isContactSelected &&
          <SelectedContactContainer />
      }
      {
        isContactAdd &&
          <AddContactContainer />
      }
    </main>
  );
};
