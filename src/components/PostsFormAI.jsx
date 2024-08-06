import { useForm, useValidateForm } from "../hooks";
import { useAI } from "../hooks/useAI";


export const PostsFormAI = () => {

    const { validatePostForm } = useValidateForm();
    const { createBlogArticle } = useAI();

    const { form, handleChange, resetForm } = useForm({
        title: '',
        keywords: '',
    });

    const handlePostsAiForm = async(e) => {
        e.preventDefault();
        validatePostForm( form ) &&
            await createBlogArticle( form ) & resetForm();
    };

  return (
    <form 
        className='ai-form-container'
        onSubmit={ handlePostsAiForm }    
    >
        <div className="ai-form-input-container">
            <label htmlFor="title">Tema de la publicación:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='title' 
                id="title"
                onChange={ handleChange }
                value={ form.title }
            />
        </div>
        <div className="ai-form-input-container">
            <label htmlFor="keywords">Palabras clave a incluir:</label>
            <input 
                className='ai-input-text'
                type="text"
                name='keywords' 
                id="keywords"
                onChange={ handleChange }
                value={ form.keywords }
            />
        </div>
        <button
            className='secondary-button ai-button'
            type='submit'
        >
            Generar publicación
        </button>
    </form>
  );
};
