import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    measurementUnits: [],
    loading: false
};

const fetchMeasurementUnitsStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchMeasurementUnitsSuccess = (state, action) => {
    return updateObject(state, {
        measurementUnits: action.measurementUnits,
        loading: false
    });
};

const fetchMeasurementUnitsFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MEASUREMENT_UNITS_START: return fetchMeasurementUnitsStart(state, action);
        case actionTypes.FETCH_MEASUREMENT_UNITS_SUCCESS: return fetchMeasurementUnitsSuccess(state, action);
        case actionTypes.FETCH_MEASUREMENT_UNITS_FAIL: return fetchMeasurementUnitsFail(state, action);
        default: return state;
    }
}

export default reducer;