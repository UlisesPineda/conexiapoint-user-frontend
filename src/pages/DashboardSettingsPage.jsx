import { useEffect, useState } from 'react';
import './styles/DashboardSettingsPage.css';

import { useAuthUser, useForm, useValidateForm } from '../hooks';
import { useSettingsUser } from '../hooks/useSettingsUser';
import { useSelector } from 'react-redux';

export const DashboardSettingsPage = () => {

  const { user } = useSelector( state => state.authUser );
  
  const [resetInput, setResetInput] = useState( false );
  const [dataSettingType, setDataSettingType] = useState( '' );
  const [isSettingsButtons, setIsSettingsButtons] = useState( false );

  const { onRenewToken   } = useAuthUser();
  const { validateSettingsForm } = useValidateForm();
  const { 
    onChangeUserName, 
    onChangeUserEnterprise,
    onChangeUserEmail,
    onChangeUserPassword,
    onChangeUserAvatar,
  } = useSettingsUser();
  const { 
    form, 
    handleChange, 
    resetForm, 
    imageForm, 
    handleFileChange,
    isDisabled,
    disableButtonForm,
    enableButtonForm,
  } = useForm({
    settingsUser: '',
    settingsEnterprise: '',
    settingsEmail: '',
    settingsPassword: '',
  });

  const selectSettingAction = async() => {
    switch ( dataSettingType ) {
      case 'settingsUser':
          disableButtonForm() &&
            await onChangeUserName( form ) &&
              handleCloseSettingsForm() & enableButtonForm();
        break;
      case 'settingsEnterprise':
          disableButtonForm() &&
            await onChangeUserEnterprise( form ) &&
              handleCloseSettingsForm() & enableButtonForm();
        break;
      case 'settingsEmail':
          disableButtonForm() &&
            await onChangeUserEmail( form ) &&
              handleCloseSettingsForm() & enableButtonForm();
        break;
      case 'settingsPassword':
          disableButtonForm() &&
            await onChangeUserPassword( form ) && 
              handleCloseSettingsForm() & enableButtonForm();
        break;
      case 'settingsFile':
          disableButtonForm() &&
            await onChangeUserAvatar( imageForm[0], user._id ) &&
              handleCloseSettingsForm() & enableButtonForm();
        break;
    }
  };

  const handleSeetingsActions = (e) => {
    e.target.previousElementSibling.classList.remove('hide-settings-input-field');
    e.target.previousElementSibling.previousElementSibling.classList.add('hide-settings-data-text');
    setIsSettingsButtons( true );
    setDataSettingType( e.target.getAttribute('data-settings-type') );
  };

  const handleEditSettingsForm = (e) => {
    e.preventDefault();
    validateSettingsForm( dataSettingType, form, imageForm ) &&
      selectSettingAction();
  };
  
  const handleCloseSettingsForm = () => {
    setIsSettingsButtons( false );  
    setDataSettingType( '' );
    setResetInput( !resetInput );    
    resetForm();
  };

  useEffect(() => {
    onRenewToken();
  }, []);
  

  return (
    <main>
      <section className="settings-container">
        <h1>Configuración de la cuenta</h1>
        <form
          key={ resetInput }
          className="settings-main-form"
          onSubmit={ handleEditSettingsForm }
        >
          <big>Edita tu información</big>
          <span className='line-block line-block-settings'></span>
          <div className="settings-input-container">
            <span className="settings-label">Usuario:</span>
            <span className="settings-data-container">
              <label htmlFor='settingsUser' className="settings-data-text"> { user.user } </label>
              <input 
                type="text" 
                id='settingsUser'
                name='settingsUser'
                placeholder='Nuevo usuario'
                className='settings-input-field hide-settings-input-field'
                onChange={ handleChange }
                value={ form.settingsUser }
              />
              <button
                type='button'
                data-settings-type='settingsUser' 
                className="settings-data-icon edit-init"
                title='Editar nombre de usuario'
                onClick={ handleSeetingsActions }
                disabled={ isSettingsButtons }
              ></button>
            </span>
          </div>
          <div className="settings-input-container">
            <span className="settings-label">Empresa:</span>
            <span className="settings-data-container">
              <label htmlFor='settingsEnterprise' className="settings-data-text"> { user.enterprise } </label>
              <input 
                type="text" 
                id='settingsEnterprise'
                name='settingsEnterprise'
                placeholder='Nueva empresa'
                className='settings-input-field hide-settings-input-field'
                onChange={ handleChange }
                value={ form.settingsEnterprise }
              />
              <button
                type='button' 
                data-settings-type='settingsEnterprise' 
                className="settings-data-icon edit-init"
                title='Editar nombre de empresa'
                onClick={ handleSeetingsActions }
                disabled={ isSettingsButtons }
              ></button>
            </span>
          </div>
          <div className="settings-input-container">
            <span className="settings-label">Correo:</span>
            <span className="settings-data-container">
              <label htmlFor='settingsEmail' className="settings-data-text"> { user.email } </label>
              <input 
                type="text" 
                id='settingsEmail'
                name='settingsEmail'
                placeholder='Nuevo correo'
                className='settings-input-field hide-settings-input-field'
                onChange={ handleChange }
                value={ form.settingsEmail }
              />
              <button
                type='button' 
                data-settings-type='settingsEmail' 
                className="settings-data-icon edit-init"
                title='Editar correo principal'
                onClick={ handleSeetingsActions }
                disabled={ isSettingsButtons }
              ></button>
            </span>
          </div>
          <div className="settings-input-container">
            <span className="settings-label">Contraseña:</span>
            <span className="settings-data-container">
              <label htmlFor='settingsPassword' className="settings-data-text">********</label>
              <input 
                id='settingsPassword'
                name='settingsPassword'
                placeholder='Nuevo password'
                className='settings-input-field hide-settings-input-field'
                onChange={ handleChange }
                value={ form.settingsPassword }
              />
              <button
                type='button' 
                data-settings-type='settingsPassword' 
                className="settings-data-icon edit-init"
                title='Editar correo principal'
                onClick={ handleSeetingsActions }
                disabled={ isSettingsButtons }
              ></button>
            </span>
          </div>
          <div className="settings-input-container">
            <span className="settings-label">Imagen:</span>
            <span className="settings-data-container">
              <span className="settings-data-image">
                <img src={ user.urlUserImg } alt="Avatar de usuario" />
              </span>
              <input 
                type="file" 
                onChange={ handleFileChange }
                className='settings-input-file hide-settings-input-field'
              />
              <button
                type='button' 
                data-settings-type='settingsFile' 
                className="settings-data-icon edit-init"
                title='Cambiar imagen de perfil'
                onClick={ handleSeetingsActions }
                disabled={ isSettingsButtons }
              ></button>
            </span>
          </div>
          <div 
            className={`
              settings-buttons-container 
              ${ isSettingsButtons ? 'display-settings-buttons-container' : '' }
          `}>
            <button
              type='button'
              className={ `secondary-button settings-page-button ${ isDisabled ? 'form-button-disabled' : '' }` }
              onClick={ handleCloseSettingsForm }
              disabled={ isDisabled }
            >
              cancelar
            </button>
            <button
              type='submit'
              className={ `secondary-button settings-page-button ${ isDisabled ? 'form-button-disabled' : '' }` }
              disabled={ isDisabled }
            >
              guardar cambios
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
