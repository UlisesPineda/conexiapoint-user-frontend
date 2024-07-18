import { useDispatch } from "react-redux";

import { conexiaPointAPI } from "../api/conexiaPointAPI";
import { onPhraseLoaded } from "../store/slices";

export const usePhraseData = () => {

    const dispatch = useDispatch();

    const getDayPhrase = async() => {
        try {
            const { data } = await conexiaPointAPI.get( '/dayphrase/get-dayphrase' );
            dispatch( onPhraseLoaded( data.phrase ) );
        } catch (error) {
            console.log( error );
        }
    };

    return {
        getDayPhrase,
    };
};
