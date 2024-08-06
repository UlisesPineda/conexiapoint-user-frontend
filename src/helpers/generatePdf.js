import { jsPDF } from 'jspdf';

export const generatePdf = ( queryResult, nameDoc ) => {
    const doc = new jsPDF();
    let yOffset = 20; 
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    queryResult.forEach(paragraph => {
        const textLines = doc.splitTextToSize(paragraph.paragraph, maxLineWidth);
        doc.text(textLines, 15, yOffset);
        doc.setFontSize(10);
        yOffset += textLines.length * 6;
        if (yOffset > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            yOffset = margin;
        }
    });
    doc.save(`${ nameDoc }.pdf`);
};

