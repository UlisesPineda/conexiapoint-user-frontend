import { useState } from "react";

export const useForm = ( initForm ) => {

    const [form, setForm] = useState( initForm );
    const [isDisabled, setIsDisabled] = useState( false );
    const [imageForm, setImageForm] = useState( [] );

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
        setImageForm( e.target.files );
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

        imageForm,
        handleFileChange,

        isDisabled,
        disableButtonForm,
        enableButtonForm,
    };
};