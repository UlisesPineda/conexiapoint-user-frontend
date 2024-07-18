import { useAlertMessage } from "./useAlertMessage";

export const useValidateForm = () => {
    
    const { startActivateMessage } = useAlertMessage();

    const phoneFormat = /^\d{10}$/;
    const nameFormat = /^[a-zA-Z\u00C0-\u02AF\s]{1,30}$/;
    const adressFormat = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,;\s]{1,150}$/;
    const enterpriseNameFormat = /^[a-zA-Z\u00C0-\u02AF\s]{1,80}$/;
    const passwordFormat = /^(?=.*[a-zA-Z0-9])(?=.*[/*\-+]).{8,16}$/;
    const noteFormat = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ.,;:!?¿¡()\-"'\s]{1,600}$/;
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const validateEmail = ( email ) => {
        if ( !emailFormat.test( email ) ) {
            startActivateMessage({ 
                title: 'El formato de correo es inválido', 
                message: 'Ingresa un correo con el formato correcto', 
                isHidenButton: false,
            });
            return;
        }
        return true;
    };
    const validateName = ( name ) => {
        if ( !nameFormat.test( name ) ){
            startActivateMessage({ 
                title: 'El formato del nombre no es válido', 
                message: 'El nombre solo acepta letras, no debe ser mayor a 30 caracteres y no acepta caracteres especiales', 
                isHidenButton: false,
            });
            return;
        }
        return true;
    };
    const validateEnterpriseName = ( enterprise ) => {
        if ( !enterpriseNameFormat.test( enterprise ) ){
            startActivateMessage({ 
                title: 'El nombre de la empresa no es válido', 
                message: 'El nombre de empresa solo acepta letras, no debe ser mayor a 80 caracteres y no acepta caracteres especiales', 
                isHidenButton: false,
            });
            return;
        }
        return true;
    };
    const validateNote = ( note ) => {
        if ( !noteFormat.test( note ) ){
            startActivateMessage({ 
                title: 'El formato de la nota ingresada es inválido', 
                message: 'El campo de notas no debe ser mayor a 600 caracteres, acepta letras y números pero no acepta caracteres especiales', 
                isHidenButton: false,
            });
            return;
        }
        return true;
    };
    const validateAdress = ( adress ) => {
        if ( !adressFormat.test( adress ) ){
            startActivateMessage({ 
                title: 'El formato de la dirección ingresada es inválido', 
                message: 'La dirección no debe ser mayor a 150 caracteres y no debe contener caracteres especiales', 
                isHidenButton: false,
            });
            return;
        }
        return true;
    };
    const validatePhone = ( phone ) => {
        if ( !phoneFormat.test( phone ) ){
            startActivateMessage({ 
                title: 'El formato de teléfono es inválido', 
                message: 'El número de teléfono debe ser de 10 dígitos', 
                isHidenButton: false,
            });
            return;
        }
        return true;
    };
    const validatePassword = ( password ) => {
        if ( !passwordFormat.test( password ) ){
            startActivateMessage({ 
                title: 'El formato del password es incorrecto', 
                message: 'El password debe contener letras, números, uno de los siguientes caracteres: / * - + y una longitud de entre 8 y 16 caracteres', 
                isHidenButton: false,
            });
            return;
        }
        return true;
    }
    // const comparePasswords = ( password, confirmPassword ) => {
    //     if ( password !== confirmPassword ) {
    //         startActivateMessage({
    //             title: 'Los passwords no coinciden',
    //             message: 'Verifica que los passwords sean iguales',
    //             isHidenButton: false,
    //         });
    //         return;
    //     }
    //     return true;
    // };
    const validateEmptyInput = ( form, title ) => {
        for (let value in form) {
            if (Object.prototype.hasOwnProperty.call(form, value)) {
                if (!form[value] || form[value] === '') {
                    startActivateMessage({
                        title, 
                        message: 'Ingresa la información requerida',
                        isHidenButton: false,     
                    })
                    return false;
                }
            }
        }
        return true;
    };


    const validateAddContactForm = ( form ) => {
        const { nameContact, emailOneContact, phoneOneContact } = form;
        let validationResult;
        if( form.nameContact ) {
            validationResult = validateName( form.nameContact );
            if( !validationResult ) return validationResult;
        }
        if( form.enterpriseContact ) {
            validationResult = validateEnterpriseName( form.enterpriseContact );
            if( !validationResult ) return validationResult; 
        }
        if( form.notesContact ) {
            validationResult = validateNote( form.notesContact );   
            if( !validationResult ) return validationResult;
        }
        if( form.adressOneContact ) {
            validationResult = validateAdress( form.adressOneContact )
                if( !validationResult ) return validationResult;
        }
        if( form.adressTwoContact ) {
            validationResult = validateAdress( form.adressTwoContact )
                if( !validationResult ) return validationResult;
        }
        if( form.emailOneContact ) {
            validationResult = validateEmail( form.emailOneContact );
               if( !validationResult ) return validationResult;
        }
        if( form.emailTwoContact ) {
            validationResult = validateEmail( form.emailTwoContact );
               if( !validationResult ) return validationResult;
        }
        if( form.phoneOneContact ) {
            validationResult = validatePhone( form.phoneOneContact );
               if( !validationResult ) return validationResult;
        }
        if( form.phoneTwoContact ) {
            validationResult = validatePhone( form.phoneTwoContact );
               if( !validationResult ) return validationResult;
        }
        return validateEmptyInput({ nameContact, emailOneContact, phoneOneContact }, 'El nombre de contacto, el correo principal y el teléfono principal son obligatorios');
    };

    const validateEventForm = ( form ) => {
        const { timeString, typeEvent, personEvent, adressEvent, phoneEvent, emailEvent, notesEvent } = form;
        let validationResult;

        if( typeEvent === 'Reunión' & adressEvent === '' ) {
            startActivateMessage({
                title: 'Para agendar una reunión es necesario agregar la dirección',
                message: 'Verifica el tipo de evento e ingresa la información requerida',
                isHidenButton: false,
            });
            return;
        }
        if( typeEvent === 'Llamada' & phoneEvent === '' ) {
            startActivateMessage({
                title: 'Para agendar una llamada es necesario agregar el teléfono',
                message: 'Verifica el tipo de evento e ingresa la información requerida',
                isHidenButton: false,
            });
            return;
        }
        if( typeEvent === 'WhatsApp' & phoneEvent === '' ) {
            startActivateMessage({
                title: 'Para enviar un mensaje es necesario agregar el teléfono',
                message: 'Verifica el tipo de evento e ingresa la información requerida',
                isHidenButton: false,
            });
            return;
        }
        if( typeEvent === 'Correo' & emailEvent === '' ) {
            startActivateMessage({
                title: 'Para enviar un correo es necesario agregar el correo del contacto',
                message: 'Verifica el tipo de evento e ingresa la información requerida',
                isHidenButton: false,
            });
            return;
        }
        
        if( personEvent ) {
            validationResult = validateName( personEvent );
            if( !validationResult ) return validationResult;
        }
        if( adressEvent ) {
            validationResult = validateAdress( adressEvent )
                if( !validationResult ) return validationResult;
        }
        if( emailEvent ) {
            validationResult = validateEmail( emailEvent );
               if( !validationResult ) return validationResult;
        }
        if( phoneEvent ) {
            validationResult = validatePhone( phoneEvent );
               if( !validationResult ) return validationResult;
        }
        if( notesEvent ) {
            validationResult = validateNote( notesEvent );   
            if( !validationResult ) return validationResult;
        }

        return validateEmptyInput({ timeString, typeEvent, personEvent }, 'Es necesario seleccionar la fecha, el tipo de evento y el nombre del contacto');
    };

    const validateSettingsForm = ( dataSettingType, form, avatarImg ) => {
        const { 
            settingsUser,
            settingsEnterprise,
            settingsEmail,
            settingsPassword ,
        } = form;
        if( dataSettingType === 'settingsUser' ) {
            return validateEmptyInput( { settingsUser }, 'El nuevo nombre de usuario es requerido' ) &&
            validateName( settingsUser );
        }  
        if( dataSettingType === 'settingsEnterprise' ) {
            return validateEmptyInput( { settingsEnterprise }, 'El nuevo nombre de la empresa es requerido' ) &&
            validateEnterpriseName( settingsEnterprise );
        }  
        if( dataSettingType === 'settingsEmail' ) {
            return validateEmptyInput( { settingsEmail }, 'El nuevo correo es requerido' ) &&
            validateEmail( settingsEmail );
        }  
        if( dataSettingType === 'settingsPassword' ) {
            return validateEmptyInput( { settingsPassword }, 'El nuevo password es requerido' ) &&
            validatePassword( settingsPassword );
        }
        if( dataSettingType === 'settingsFile' ) {
            if( !avatarImg.length ) {
                startActivateMessage({
                    title: 'No has seleccionado la nueva imagen de usuario',
                    message: 'Agrega la imagen requerida',
                    isHidenButton: false,
                });
                return;
            }
            return true;
        }
    };


    return {        
        validateEmptyInput,
        validateEmail,
        validateName,
        validateAddContactForm,
        validateEventForm,
        validateSettingsForm,
        validateNote,
    };
};