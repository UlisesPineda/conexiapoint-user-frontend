import { conexiaPointAPI } from "../api/conexiaPointAPI";
import { useAlertMessage } from "./useAlertMessage";

export const useFeedbackUser = () => {

    const { startActivateMessage } = useAlertMessage()

    const createFeedback = async( form ) => {
        try {
            await conexiaPointAPI.post( '/feedback/create-feedback', form );
            startActivateMessage({
                title: 'Tu sugerencia fue enviada con éxito',
                message: '¡Agradecemos tus comentarios!',
                isHidenButton: false,
            });
            return true;
        } catch (error) {
            if( error.response.status === 404 ){
                startActivateMessage({
                    title: error.response.data.message,
                    message: error.response.data.text,
                    isHidenButton: false,
                });
                return false;
            }
            else {
                startActivateMessage({
                    title: 'Hubo un error al enviar tu sugerencia',
                    message: 'Intenta más tarde',
                    isHidenButton: false,
                });
                return false;
            }
        }
    };

    return {
        createFeedback,
    };
};