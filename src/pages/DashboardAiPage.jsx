import { useSelector } from 'react-redux';
import './styles/DashboardAiPage.css';

import { 
    AiPostResultcontainer,
    AiResultContainer, 
    BussinesFormIA, 
    BuyerPersonFormAI, 
    EmailMarketingFormAI, 
    PostsFormAI, 
    // ProductDescriptionFormAI,
} from '../components';
import { AiEmailMarketingContainer } from '../components/AiEmailMarketingContainer';

export const DashboardAiPage = () => {

    const { isFound, isBuyerperson, isPost, isEmailMarketing } = useSelector( state => state.ai );

  return (
    <main>
        <section className="ai-container">
            <h1>Asistente de inteligencia artificial</h1>
            <p>Con la ayuda de la inteligencia artificial, ahora en tu CRM Conexia Point puedes crear una estrategia de negocios completa, desde la concepción de la idea, hasta la ejecución de la estrategia generada por tu asistente comercial de Inteligencia Artificial.</p>
            <div className="ai-block-container">
                <div className="ai-block">
                    <big>Consultor de estrategias comerciales</big>
                    <span className='line-block'></span>
                    <BussinesFormIA />
                </div>
                {
                    isFound &&
                        <AiResultContainer />
                }
                <div className="ai-block">
                    <big>Identificador del buyer persona</big>
                    <span className="line-block"></span>
                    <BuyerPersonFormAI />
                </div>
                {
                    isBuyerperson &&
                        <AiResultContainer />
                }
                <div className="ai-block">
                    <big>Generador de publicaciones para blog optimizada para SEO</big>
                    <span className="line-block"></span>
                    <PostsFormAI />
                </div>
                {
                    isPost && 
                        <AiPostResultcontainer />
                }
                <div className="ai-block">
                    <big>Generador de correo publicitario</big>
                    <span className="line-block"></span>
                    <EmailMarketingFormAI />
                </div>
                {
                    isEmailMarketing && 
                        <AiEmailMarketingContainer />
                }
            </div>
        </section>
    </main>
  );
};

