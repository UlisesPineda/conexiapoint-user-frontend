import { useSelector } from "react-redux";

import { useAI } from "../hooks/useAI";
import { generatePdf } from "../helpers";

export const AiResultContainer = () => {

    const { queryResult, isFound, isBuyerperson } = useSelector( state => state.ai );

    const { cleanAiSearch } = useAI();

  return (
    <div className="ai-block">
        <big>
             {
                isFound &&
                    'Estrategia:' ||
                isBuyerperson &&
                    'Perfil del buyer person:'
             } 
        </big>
        <span className="line-block"></span>
        <div className="ai-result-container">
            {
                queryResult.map(
                    ( paragraph, i ) => {
                        return (
                            <div
                                key={ i }
                            >
                                <span >
                                    { paragraph.paragraph }
                                </span>
                                <br />
                                <br />
                            </div>
                        )
                    }
                )
            }
        </div>
        <div className="ai-button-container">
            <button
                className='secondary-button ai-button'
                onClick={ cleanAiSearch }
            >
                Limpiar resultados
            </button>
            <button
                className='secondary-button ai-button'
                onClick={ () => generatePdf( queryResult, `${ isFound && 'bussines-estrategy' || isBuyerperson && 'buyer-person' }` ) }
                title="Descargar documento"
            >
                Generar PDF
            </button>
        </div>
    </div>
  );
};
