import { useDispatch } from 'react-redux';
import { marked } from 'marked';

import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

import { useAlertMessage } from './useAlertMessage';
import { generateParagraphs } from '../helpers';
import { 
    onCleanSearch, 
    onSuccesfulBuyerPerson, 
    onSuccesfulEmail, 
    onSuccesfulPost, 
    onSuccesfulSearch, 
} from '../store/slices';
import { conexiaPointAPI } from '../api/conexiaPointAPI';

export const useAI = () => {

    const dispatch = useDispatch();
    const { startActivateMessage, startDesactivateMessage } = useAlertMessage();

    const google = createGoogleGenerativeAI({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });

    const handleError = ( error ) => {
        console.log( error );
        startDesactivateMessage();
        return false;
    };

    const generateBussinesQuery = async( form ) => {
        const { topic, product } = form;
        startActivateMessage({
            title: `La IA está procesando tu ${ topic }`,
            message: 'Generando consulta...',
            isHidenButton: true,
        });
        if( topic === 'plan de negocios' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Créame un plan de negocios para un negocio para ${ product }`,
                })
                startDesactivateMessage();
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
                return true;                      
            } catch (error) {
                handleError( error );
            }
        }
        if( topic === 'idea de negocios' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Dame una idea de negocios para ${ product } que contenga opcines tanto para venta de producto en línea como físico, muestra sus indicadores comerciales, participación de mercado , indicadores financieros que sean relevantes para la toma de deciciones y justífícalo`,
                })
                startDesactivateMessage();
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
                return true;                      
            } catch (error) {
                handleError( error );
            }
        }
        if ( topic === 'análisis de competencia' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Hazme un análisis de competencia de ${ product }, muestra su tendencia de ventas, la temporada de mayor venta, el canal de mayor crecimiento y fortalezas y debilidades`,
                })
                startDesactivateMessage();
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
                return true;                      
            } catch (error) {
                handleError( error );
            }
        }
        if ( topic === 'tendencia de mercado' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Muéstramte la tendencia de mercado de: ${ product } y toda la información relacionada para una buena toma de decisiones`,
                })
                startDesactivateMessage();
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
                return true;                      
            } catch (error) {
                handleError( error );
            }
        }
        if ( topic === 'estrategia de marketing' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Créame una estrategia de marketing para: ${ product } considera tanto canales digitales como físicos, cuál sería la mejor opción y justifícalo`,
                })
                startDesactivateMessage();
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) ); 
                return true;                      
            } catch (error) {
                handleError( error );
            }
        }
    } ;

    const identifyBuyerPerson = async( form ) => {
        const { product } = form;
        startActivateMessage({
            title: `La IA está buscando el perfil más adecuado para: ${ product }`,
            message: 'Generando consulta...',
            isHidenButton: true,
        });
        try {
            const { text } = await generateText({
                model: google('models/gemini-1.5-flash-latest'),
                prompt: `Dame los datos demográficos, psicográficos, de comportamiento de compra, sus fuentes de información, los datos sociales y digitales de las personas que compran: ${ product }`,
            })
            startDesactivateMessage();
            const textFormated = generateParagraphs ( text );
            dispatch( onSuccesfulBuyerPerson( textFormated ) )
            return true;
        } catch (error) {
            handleError( error );
        }
    };

    const createBlogArticle = async( form ) => {
        const { title, keywords } = form;
        startActivateMessage({
            title: `La IA está creando un post para: ${ title }`,
            message: 'Creando post...',
            isHidenButton: true,
        });
        try {
            const { text } = await generateText({
                model: google('models/gemini-1.5-flash-latest'),
                prompt: `Créame un artículo para un blog de al menos 1000 palabras, en el título inlcuye cualquiera de las siquientes palabras: ${ title } y debes incluir las siguientes palabras clave: ${ keywords }`,
            })
            startDesactivateMessage();
            const htmlOutput = marked( text );
            const textFormated = generateParagraphs ( text );
            dispatch( onSuccesfulPost({ text: textFormated, post: htmlOutput }) );
            return true;
        } catch (error) {
            handleError( error );
        }
    };

    const createEmailMarketing = async( form ) => {
        const { recipient, item, email } = form;
        startActivateMessage({
            title: `La IA está creando el correo para: ${ recipient }`,
            message: 'Creando correo publicitario...',
            isHidenButton: true,
        });
        try {
            const { text } = await generateText({
                model: google('models/gemini-1.5-flash-latest'),
                prompt: `Créame un correo publictario que está dirigido a: ${ recipient } para  promocionar el producto: ${ item }, debes dar un saludo cálido y ligero, tiene que ser un correo conciso y que destaque el valor del producto sin tanto adorno pero si debe incluir un CTA, haz uso de emojis para captar la atención en los puntos más importantes`
            })
            startDesactivateMessage();
            const textFormated = generateParagraphs ( text );
            dispatch( onSuccesfulEmail({ textFormated, email, recipient }) );
            return true;
        } catch (error) {
            handleError( error );
        }
    };

    const sendEmailMarketing = async( form ) => {
        try {
            const { data } = await conexiaPointAPI.post('/aidata/send-email-marketing', form);
            startActivateMessage({
                title: data.message,
                message: data.text,
                isHidenButton: false,
            });
            dispatch( onCleanSearch() );
            return true;
        } catch (error) {
            handleError( error );
        }
    };

    const cleanAiSearch = () => {
        dispatch( onCleanSearch() );
    };

    return {
        generateBussinesQuery,
        cleanAiSearch,
        identifyBuyerPerson,
        createBlogArticle,
        createEmailMarketing,
        sendEmailMarketing,
    };
};