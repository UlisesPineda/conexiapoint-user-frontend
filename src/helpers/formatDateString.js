export const formatDateString = ( dateTimeString ) => {
    const date = new Date( dateTimeString );
    const options = { day: 'numeric', month: 'long', year: 'numeric' };    
    const formattedDate = date.toLocaleDateString('es-ES', options);
    return formattedDate;
};