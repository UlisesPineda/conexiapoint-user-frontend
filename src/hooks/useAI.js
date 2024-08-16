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
    const { startActivateMessage } = useAlertMessage();

    const google = createGoogleGenerativeAI({
        apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    });

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
                startActivateMessage({
                    title: `Tu plan de negocios para: "${ product }", se generó correctamente`,
                    message: 'Puedes descargarlo en formato PDF',
                    isHidenButton: false,
                });
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
            } catch (error) {
                console.log( error );
                startActivateMessage({
                    title: 'Hubo un error al generar el plan de negocios',
                    message: 'Intenta hacer otra consulta',
                    isHidenButton: false,
                });
            }
        }
        if( topic === 'idea de negocios' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Dame una idea de negocios para ${ product } que contenga opcines tanto para venta de producto en línea como físico, muestra sus indicadores comerciales, participación de mercado , indicadores financieros que sean relevantes para la toma de deciciones y justífícalo`,
                })
                startActivateMessage({
                    title: `Tu idea de negocios para: "${ product }", se generó correctamente`,
                    message: 'Puedes descargarlo en formato PDF',
                    isHidenButton: false,
                });
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
            } catch (error) {
                console.log( error );
                startActivateMessage({
                    title: 'Hubo un error al generar la idea de negocios',
                    message: 'Intentan más tarde o cambia el producto o servicio'
                });
            }
        }
        if ( topic === 'análisis de competencia' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Hazme un análisis de competencia de ${ product }, muestra su tendencia de ventas, la temporada de mayor venta, el canal de mayor crecimiento y fortalezas y debilidades`,
                })
                startActivateMessage({
                    title: `Tu análisis de competencia para: "${ product }", se generó correctamente`,
                    message: 'Puedes descargarlo en formato PDF',
                    isHidenButton: false,
                });
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
            } catch (error) {
                console.log( error );
                startActivateMessage({
                    title: 'Hubo un error al generar el análisis de competencia',
                    message: 'Intentan más tarde o cambia el producto o servicio'
                });
            }
        }
        if ( topic === 'tendencia de mercado' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Muéstramte la tendencia de mercado de: ${ product } y toda la información relacionada para una buena toma de decisiones`,
                })
                startActivateMessage({
                    title: `Tu tendencia de mercado para: "${ product }", se generó correctamente`,
                    message: 'Puedes descargarla en formato PDF',
                    isHidenButton: false,
                });
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) );
            } catch (error) {
                console.log( error );
                startActivateMessage({
                    title: 'Hubo un error al generar la tendencia de mercado',
                    message: 'Intentan más tarde o cambia el producto o servicio'
                });
            }
        }
        if ( topic === 'estrategia de marketing' ) {
            try {
                const { text } = await generateText({
                    model: google('models/gemini-1.5-flash-latest'),
                    prompt: `Créame una estrategia de marketing para: ${ product } considera tanto canales digitales como físicos, cuál sería la mejor opción y justifícalo`,
                })
                startActivateMessage({
                    title: `Tu estrategia de marketing para: "${ product }", se generó correctamente`,
                    message: 'Puedes descargarla en formato PDF',
                    isHidenButton: false,
                });
                const textFormated = generateParagraphs ( text );
                dispatch( onSuccesfulSearch( textFormated ) ); 
            } catch (error) {
                console.log( error );
                startActivateMessage({
                    title: 'Hubo un error al generar la estrategia de marketing',
                    message: 'Intentan más tarde o cambia el producto o servicio'
                });
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
            startActivateMessage({
                title: `El buyer persona para: "${ product }", se generó correctamente`,
                message: 'Puedes descargarlo en formato PDF',
                isHidenButton: false,
            });
            const textFormated = generateParagraphs ( text );
            dispatch( onSuccesfulBuyerPerson( textFormated ) )
        } catch (error) {
            console.log( error );
            startActivateMessage({
                title: 'Hubo un error al generar el buyer persona',
                message: 'Intenta más tarde o cambia el producto o servicio',
                isHidenButton: false,
            });
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
            startActivateMessage({
                title: `El post para: "${ title }", se generó correctamente`,
                message: 'Tu post se generó en formato HTML y formato de texto',
                isHidenButton: false,
            });
            const htmlOutput = marked( text );
            const textFormated = generateParagraphs ( text );
            dispatch( onSuccesfulPost({ text: textFormated, post: htmlOutput }) );
        } catch (error) {
            console.log( error );
            startActivateMessage({
                title: 'Tengo problemas éticos con algunos temas y ciertas palabras',
                message: 'Intenta con otro tema o cambia algunas palabras',
                isHidenButton: false,
            });
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
            startActivateMessage({
                title: `El correo para: "${ recipient }", se generó correctamente`,
                message: 'Puedes editar o añadir información adicional antes de enviar el correo',
                isHidenButton: false,
            });
            const textFormated = generateParagraphs ( text );
            dispatch( onSuccesfulEmail({ textFormated, email, recipient }) );
        } catch (error) {
            console.log( error );
            startActivateMessage({
                title: 'Hubo un error al generar el correo publicitario',
                message: 'Intentan más tarde o cambia el producto o servicio'
            });
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
            console.log( error );
            startActivateMessage({
                title: 'Hubo un error al enviar el correo',
                message: 'Intentan más tarde'
            });
        }
    };

    const cleanAiSearch = () => {
        dispatch( onCleanSearch() );
        return true;
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