import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchDailyNutritionSuccess = (dailyNutrition) => {
    return {
        type: actionTypes.FETCH_DAILY_NUTRITION_SUCCESS,
        dailyNutrition: dailyNutrition
    };
};

export const fetchDailyNutritionFail = (error) => {
    return {
        type: actionTypes.FETCH_DAILY_NUTRITION_FAIL,
        error: error
    };
};

export const fetchDailyNutritionStart = () => {
    return {
        type: actionTypes.FETCH_DAILY_NUTRITION_START
    };
};

export const fetchDailyNutrition = (token) => {
    return dispatch => {
        dispatch(fetchDailyNutritionStart());
        axios.get('/daily-nutrition',  {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                const fetchedDailyNutrition = res.data.dailyNutrition;
                dispatch(fetchDailyNutritionSuccess(fetchedDailyNutrition));
            }).catch(err => {
                dispatch(fetchDailyNutritionFail(err));
            });
    };
};