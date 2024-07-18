export const formatMonthString = ( dateTimeString ) => {
    const date = new Date( dateTimeString );
    const options = { month: 'long', year: 'numeric' };    
    const formattedDate = date.toLocaleDateString('es-ES', options);
    return formattedDate;
};