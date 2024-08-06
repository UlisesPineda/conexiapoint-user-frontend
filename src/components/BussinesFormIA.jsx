import { useForm, useValidateForm } from "../hooks";
import { useAI } from "../hooks/useAI";

export const BussinesFormIA = () => {

    const { form, handleChange, resetForm } = useForm({
        topic: '',
        product: '',
    });
    const { generateBussinesQuery } = useAI();
    const { validateAiForm } = useValidateForm();

    const handleBussinesAiForm = async(e) => {
        e.preventDefault();
        validateAiForm( form ) &&
            await generateBussinesQuery( form ) & resetForm();   
    };

  return (
    <form 
        className='ai-form-container'
        onSubmit={ handleBussinesAiForm }    
    >
        <div className="ai-form-input-container">
            <label htmlFor='topic'>Selecciona el tema de consulta:</label>
            <select 
                className='ai-input-select'
                name="topic" 
                id="topic"
                onChange={ handleChange }
                value={ form.topic }
            >
                <option value="Selección">--Selecciona un tema--</option>
                <option value="idea de negocios">Idea de negocio</option>
                <option value="tendencia de mercado">Tendencia de mercado</option>
                <option value="análisis de competencia">Análisis de competencia</option>
                <option value="estrategia de marketing">Estrategia de marketing</option>
                <option value="plan de negocios">Plan de negocios</option>
            </select>
        </div>
        <div className="ai-form-input-container">
            <label htmlFor="product">Selecciona el producto/giro comercial:</label>
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
            Generar estrategia
        </button>
    </form>
  );
};
