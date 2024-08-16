import { useState } from "react";
import { useSelector } from "react-redux";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useAI } from "../hooks/useAI";
import { generatePdf } from "../helpers";

export const AiPostResultcontainer = () => {

    const [copyHtml, setCopyHtml] = useState( false );

    const { queryResult, htmlPost } = useSelector( state => state.ai );
    const { cleanAiSearch } = useAI();

    const handleCopyClipboard = () => {
        setCopyHtml( true );
    };

  return (
    <div className="ai-block">
        <big>Publicación en formato de texto</big>
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
                <span
                    className="icon-secondary-button clean"
                >
                </span>
                <span className="text-secondary-button">
                    Limpiar resultados
                </span>
            </button>
            <CopyToClipboard text={ htmlPost }>
                <button
                    className='secondary-button ai-button'
                    onClick={ handleCopyClipboard }
                    title={ copyHtml ? '¡HTML Copiado!' : 'Copiar HTML' }
                >
                    <span
                        className="icon-secondary-button copy"
                    >
                    </span>
                    <span className="text-secondary-button">
                        { copyHtml ? '¡HTML Copiado!' : 'Copiar HTML' }
                    </span>
                </button>
            </CopyToClipboard>
            <button
                className='secondary-button ai-button'
                onClick={ () => generatePdf( queryResult, 'posted-article' ) }
                title="Descargar documento"
            >
                <span
                    className="icon-secondary-button pdf"
                >
                </span>
                <span className="text-secondary-button">
                    Generar PDF
                </span>
            </button>
        </div>
    </div>
  );
};
