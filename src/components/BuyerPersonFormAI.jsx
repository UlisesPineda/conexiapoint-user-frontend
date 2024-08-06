import { useForm, useValidateForm } from "../hooks";
import { useAI } from "../hooks/useAI";


export const BuyerPersonFormAI = () => {

    const { identifyBuyerPerson } = useAI();
    const { validateAiForm } = useValidateForm();
    const { form, handleChange, resetForm } = useForm({
        product: ''
    });

    const handleBuyerPersonaForm = async(e) => {
        e.preventDefault();
        validateAiForm( form ) &&
            await identifyBuyerPerson( form ) & resetForm();
    };

  return (
    <form 
        className='ai-form-container'
        onSubmit={ handleBuyerPersonaForm }    
    >
        <div className="ai-form-input-container">
            <div>
                <label htmlFor="product">Indica a la IA el producto a promocionar:</label>
                <br />
                <small>Ej: Reloj deportivo sumergible marca Swatch</small>
            </div>
            <input 
                className='ai-input-text'
                type="text"
                name='product' 
                id="product"
                onChange={ handleChange }
                value={ form.product }
            />
        </div>
        <button
            className='secondary-button ai-button'
            type='submit'
        >
            Identificar perfil
        </button>
    </form>
  );
};
