import { useForm } from "../hooks";


export const ProductDescriptionFormAI = () => {

    const { form, handleChange } = useForm({
        productName: '',
        target: '',
        description: '',
    });

    const handleDescriptionForm = (e) => {
        e.preventDefault();
    };

  return (
    <form 
        className='ai-form-container'
        onSubmit={ handleDescriptionForm }    
    >
        <div className="ai-form-input-container">
            <label htmlFor="productName">Nombre del producto:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='productName' 
                id="productName"
                onChange={ handleChange }
                value={ form.productName }
            />
        </div>
        <div className="ai-form-input-container">
            <label htmlFor="target">Audiencia objetiva:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='target' 
                id="target"
                onChange={ handleChange }
                value={ form.target }
            />
        </div>
        <div className="ai-form-input-container">
            <label htmlFor="description">Breve descripción:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='description' 
                id="description"
                onChange={ handleChange }
                value={ form.description }
            />
        </div>
        <button
            className='secondary-button ai-button'
            type='submit'
        >
            Generar descripción
        </button>
    </form>
  );
};
