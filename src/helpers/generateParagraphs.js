export const generateParagraphs = ( text ) => {
    const cleanText = text.replace(/[*#]/g, '').trim();
    const paragraphs = cleanText.split('\n\n').filter(parrafo => parrafo.trim() !== ''); 
    const paragraphObject = paragraphs.map(paragraph => ({ paragraph }));
    return paragraphObject
};
