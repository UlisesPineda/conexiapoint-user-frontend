import { useEffect, useState } from 'react';

import './styles/FormEvent.css';
import { useForm, useEventData, useValidateForm } from '../hooks';
import { useSelector } from 'react-redux';

export const FormEvent = () => {


  const { eventSelected, isEditEvent  } = useSelector( state => state.eventData );
  const [hidenEventForm, setHidenEventForm] = useState( false );

  const { validateEventForm } = useValidateForm();
  const { startCloseEventForm, createEvent, editEvent } = useEventData();
  const { form, handleChange, setForm, resetForm, isDisabled, disableButtonForm, enableButtonForm } = useForm({
    timeString: '',
    typeEvent: '',
    personEvent: '',
    adressEvent: '',
    emailEvent: '',
    phoneEvent: '',
    notesEvent: '',
  });

  const handleCloseForm = () => {
    setHidenEventForm( true );
    setTimeout(() => {
      startCloseEventForm();
      resetForm();
    }, 300);
  };

  const terminateFormActions = () => {
    resetForm();
    enableButtonForm();
    handleCloseForm();
  };

  const sendData = async() => {
    isEditEvent 
    ?
    disableButtonForm() &&
      await editEvent( eventSelected._id, form ) ?
        terminateFormActions() :
          enableButtonForm()
    :
    disableButtonForm() &&
      await createEvent( form ) ?
        terminateFormActions() :
          enableButtonForm();
  };

  const handleEventForm = async(e) => {
    e.preventDefault();
    validateEventForm( form ) &&
      await sendData();
  };

  useEffect(() => {
    setForm({
      timeString: eventSelected.timeString || '',
      typeEvent: eventSelected.typeEvent || '',
      personEvent: eventSelected.personEvent || '',
      adressEvent: eventSelected.adressEvent || '',
      emailEvent: eventSelected.emailEvent || '',
      phoneEvent: eventSelected.phoneEvent || '',
      notesEvent: eventSelected.notesEvent || '',  
    });
  }, [ isEditEvent ]);
  

  return (
    <div className={`
      form-event-container 
      ${ hidenEventForm ? 'hide-form-event-container' : '' }`}
    >
        <form
            className="form-event"
            onSubmit={ handleEventForm }
        >
            <div className="event-block-form-container">
              <label htmlFor="timeString">Selecciona la fecha y hora: <small>(Requerido)</small></label>
              <input
                id='timeString' 
                type="datetime-local" 
                name='timeString'
                value={ form.timeString }
                onChange={ handleChange }
              />
            </div>
            <div className="event-block-form-container">
              <label htmlFor="typeEvent">Tipo de evento: <small>(Requerido)</small> </label>
              <select 
                id="typeEvent"
                name="typeEvent" 
                value={ form.typeEvent }
                onChange={ handleChange }
              >
                <option value="">--Selecciona el tipo de evento--</option>
                <option value="Reunión">Reunión</option>
                <option value="Llamada">Llamada</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Correo">Correo</option>
              </select>
            </div>
            <div className="event-block-form-container">
              <label htmlFor="personEvent">Nombre del contacto:</label>
              <input 
                type="text" 
                id='personEvent'
                name='personEvent'
                placeholder='Requerido'
                value={ form.personEvent }
                onChange={ handleChange }
              />
            </div>
            <div className="event-block-form-container">
              <label htmlFor="adressEvent">Dirección:</label>
              <input 
                type="text" 
                id='adressEvent'
                name='adressEvent'
                value={ form.adressEvent }
                onChange={ handleChange }
              />
            </div>
            <div className="event-block-form-container">
              <label htmlFor="emailEvent">Correo:</label>
              <input 
                type="text" 
                id='emailEvent'
                name='emailEvent'
                value={ form.emailEvent }
                onChange={ handleChange }
              />
            </div>
            <div className="event-block-form-container">
              <label htmlFor="phoneEvent">Teléfono:</label>
              <input 
                type="text" 
                id='phoneEvent'
                name='phoneEvent'
                value={ form.phoneEvent }
                onChange={ handleChange }
              />
            </div>
            <div className="event-block-form-container">
              <label htmlFor="notesEvent">Notas:</label>
              <textarea 
                name="notesEvent" 
                id="notesEvent"
                value={ form.notesEvent }
                onChange={ handleChange }
              ></textarea>
            </div>
            <div className="event-form-buttons-container">
              <button 
                className={ isDisabled ? 'form-button-disabled' : '' }
                type='button'
                disabled={ isDisabled }
                onClick={ handleCloseForm }
              >cancelar</button>
              <button 
                className={ isDisabled ? 'form-button-disabled' : '' }
                type='submit'
                disabled={ isDisabled }
              >
                { isEditEvent ? 'Editar evento' : 'Crear evento' }
              </button>
            </div>
        </form>
    </div>
  );
};
