import { useForm, useValidateForm } from "../hooks";
import { useAI } from "../hooks/useAI";


export const EmailMarketingFormAI = () => {

    const { createEmailMarketing, cleanAiSearch } = useAI();
    const { validateEmailForm } = useValidateForm();
    const { form, handleChange, resetForm } = useForm({
        email: '',
        item: '',
        recipient: '',
    });

    const handleEmailMktForm = async(e) => {
        e.preventDefault();
        validateEmailForm( form ) &&
            cleanAiSearch() &&
                await createEmailMarketing( form ) & resetForm();
    };

  return (
    <form 
        className='ai-form-container'
        onSubmit={ handleEmailMktForm }    
    >
        <div className="ai-form-input-container">
            <label htmlFor="email">Correo del destinatario:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='email' 
                id="email"
                onChange={ handleChange }
                value={ form.email }
            />
        </div>
        <div className="ai-form-input-container">
            <label htmlFor="recipient">Nombre del destinatario:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='recipient' 
                id="recipient"
                onChange={ handleChange }
                value={ form.recipient }
            />
        </div>
        <div className="ai-form-input-container">
            <label htmlFor="item">Producto/Servicio a promocionar:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='item' 
                id="item"
                onChange={ handleChange }
                value={ form.item }
            />
        </div>
        <button
            className='secondary-button ai-button'
            type='submit'
        >
            Generar correo
        </button>
    </form>
  );
};
