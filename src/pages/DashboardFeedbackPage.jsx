import './styles/DashboardFeedbackPage.css';
import { useFeedbackUser, useForm, useValidateForm } from '../hooks';

export const DashboardFeedbackPage = () => {

  const { createFeedback } = useFeedbackUser();
  const { validateEmptyInput, validateNote } = useValidateForm();
  const { 
    form, 
    handleChange, 
    resetForm, 
    isDisabled, 
    disableButtonForm, 
    enableButtonForm,
  } = useForm({ feedback: '' });

  const handleFeedbackForm = async( e ) => {
    e.preventDefault();
    validateEmptyInput( 
      form, 
      'No has agregado alguna sugerencia o comentario' 
    ) &&
      validateNote( form.feedback ) &&
        disableButtonForm() &&
          await createFeedback( form ) ?
            resetForm() & enableButtonForm() :
              enableButtonForm();
  };

  return (
    <main>
        <section className="feedback-container">
            <h1>Queremos escucharte</h1>
            <p>Tu opinión es muy importante para nosotros, si tienes alguna sugerencia, comentario o necesitas alguna funcionalidad que consideres que sería genial tener, te pedimos que nos envíes tus requerimientos para que valoremos su viabilidad, si es aprobada, la función estará disponible en tu panel de usuario.</p>
            <p>Agradecemos el tiempo que te tomas para mejorar nuestro servicio.</p>
            <form 
              className="feedback-form-container"
              onSubmit={ handleFeedbackForm }
            >
              <label htmlFor="feedback"> <big>Comentario, sugerencia o petición.</big> </label>
              <span className='line-block line-block-settings'></span>
              <textarea 
                name="feedback" 
                id="feedback"
                value={ form.feedback }
                onChange={ handleChange }
              ></textarea>
              <button
                disabled={ isDisabled }
                type='submit'
                className={ 
                  `secondary-button feedback-button 
                  ${ isDisabled ? 'form-button-disabled' : '' }` 
                }
              >
                enviar  
              </button>
            </form>
        </section>
    </main>
  );
};
