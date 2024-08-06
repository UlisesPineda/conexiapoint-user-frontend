import { useSelector } from "react-redux";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useAI } from "../hooks/useAI";
import { generatePdf } from "../helpers";

export const AiPostResultcontainer = () => {

    const { queryResult, htmlPost } = useSelector( state => state.ai );
    const { cleanAiSearch } = useAI();

  return (
    <div className="ai-block">
        <big>Publicación solo texto</big>
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
        <big>Publicación en formato HTML</big>
        <span className="line-block"></span>
        <SyntaxHighlighter
            language="html"
            style={ shadesOfPurple }
            wrapLongLines={ true }
        >
            { htmlPost }
        </SyntaxHighlighter>
        <div className="ai-button-container">
            <button
                className='secondary-button ai-button'
                onClick={ cleanAiSearch }
            >
                Limpiar resultados
            </button>
            <button
                className='secondary-button ai-button'
                onClick={ () => generatePdf( queryResult, 'posted-article' ) }
                title="Descargar documento"
            >
                Generar PDF
            </button>
        </div>
    </div>
  );
};
