export const formatTimeString = ( dateTimeString ) => {
    const date = new Date( dateTimeString );
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', options);
    return formattedTime;
};