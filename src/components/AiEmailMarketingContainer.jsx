import { useSelector } from "react-redux";
import { useForm } from "../hooks";
import { useEffect } from "react";
import { useAI } from "../hooks/useAI";


export const AiEmailMarketingContainer = () => {

    const { sendEmailMarketing, cleanAiSearch } = useAI();
    const { queryResult, isEmailMarketing } = useSelector( state => state.ai );
    const { form, handleChange, setForm, resetForm } = useForm({
        email: '',
        recipient: '',
        content: '',
    });

    const createText = ( paragraphArray ) => {
        const paragraphs = paragraphArray.slice(1).map( paragraph => paragraph.paragraph );
        const fullText = paragraphs.join('\n\n');
        return fullText
    };    
    const content = createText( queryResult.textFormated );

    const handleEmailMarketing = async(e) => {
        e.preventDefault();
        await sendEmailMarketing( form ) & resetForm();
    };    
    
    useEffect(() => {
        isEmailMarketing && setForm({ email: queryResult.email, recipient: queryResult.recipient, content });
    }, []);
    

  return (
    <div className="ai-block">
        <big>Correo publicitario</big>
        <span className="line-block"></span>
        <form
            className="ai-form-marketing"
            onSubmit={ handleEmailMarketing }
        >
            <label htmlFor="email">Correo del destinatario:</label>
            <input 
                type="text"
                name="email"
                id="email" 
                value={ form.email }
                onChange={ handleChange }
            />
            <label htmlFor="recipient">Nombre del destinatario</label>
            <input 
                type="text"
                name="recipient"
                id="recipient" 
                value={ form.recipient }
                onChange={ handleChange }
            />
            <label htmlFor="content"></label>
            <textarea 
                name="content" 
                id="content"
                value={ form.content }
                onChange={ handleChange }
            ></textarea>
            <div className="ai-form-button-container">
                <button
                    type="button"
                    className="secondary-button ai-button"
                    onClick={ cleanAiSearch }
                >
                    <span
                        className="icon-secondary-button clean"
                    >
                    </span>
                    <span className="text-secondary-button">
                        Cancelar
                    </span>
                </button>
                <button
                    type="submit"
                    className="secondary-button ai-button"
                >
                    <span
                        className="icon-secondary-button sendmail"
                    >
                    </span>
                    <span className="text-secondary-button">
                        Enviar Correo    
                    </span>
                </button>
            </div>
        </form>
    </div>
  );
};
