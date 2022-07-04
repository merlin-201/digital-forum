import * as api from "../api";
import { FETCH_ADS } from "../constants/actionTypes";

export const fetchAds = (selectedCategoryId) => async (dispatch) => {
    try {
        let { data } = await api.fetchAds();
        dispatch( { type : FETCH_ADS, payload : data.data } );
    } catch (error) {
        console.log(error);
    }
}