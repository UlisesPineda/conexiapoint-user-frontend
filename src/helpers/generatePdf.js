import { jsPDF } from 'jspdf';

export const generatePdf = ( queryResult, nameDoc ) => {
    const doc = new jsPDF();
    let yOffset = 21; 
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 19;
    const maxLineWidth = pageWidth - margin * 2;
    queryResult.forEach(paragraph => {
        const textLines = doc.splitTextToSize(paragraph.paragraph, maxLineWidth);
        doc.text(textLines, 19, yOffset, );
        doc.setFontSize(9);
        yOffset += textLines.length * 6;
        if (yOffset > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            yOffset = margin;
        }
    });
    doc.save(`${ nameDoc }.pdf`);
};

