import { useState } from "react";

export const useForm = ( initForm ) => {

    const [form, setForm] = useState( initForm );
    const [isDisabled, setIsDisabled] = useState( false );
    const [avatarImgForm, setAvatarImgForm] = useState( [] );

    const handleChange = ( { target } ) => {
        const { name, value } = target;
        setForm({
            ...form,
            [ name ]: value,
        });
    };

    const resetForm = () => {
        setForm( initForm );
    };
    
    const handleFileChange = ( e ) => {
        setAvatarImgForm( e.target.files );
    };

    const disableButtonForm = () => {
        setIsDisabled( true );
        return true;
    };

    const enableButtonForm = () => {
        setIsDisabled( false );
        return true;
    };

    return {
        form,
        setForm,
        resetForm,
        handleChange,

        avatarImgForm,
        handleFileChange,

        isDisabled,
        disableButtonForm,
        enableButtonForm,
    };
};