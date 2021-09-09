import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    dailyNutrition: [],
    loading: false
};

const fetchDailyNutritionStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchDailyNutritionSuccess = (state, action) => {
    return updateObject(state, {
        dailyNutrition: action.dailyNutrition,
        loading: false
    });
};

const fetchDailyNutritionFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DAILY_NUTRITION_START: return fetchDailyNutritionStart(state, action);
        case actionTypes.FETCH_DAILY_NUTRITION_SUCCESS: return fetchDailyNutritionSuccess(state, action);
        case actionTypes.FETCH_DAILY_NUTRITION_FAIL: return fetchDailyNutritionFail(state, action);
        default: return state;
    }
}

export default reducer;