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

const addMeasurementUnitsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addMeasurementUnitsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        measurementUnits: state.measurementUnits.concat(action.measurementUnitData),
    });
};

const addMeasurementUnitsFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const editMeasurementUnitsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const editMeasurementUnitsSuccess = (state, action) => {
    const editedMeasurementUnit = action.measurementUnitData;
    const newMeasurementUnits = state.measurementUnits;
    const index = newMeasurementUnits.findIndex(ing => ing.id === editedMeasurementUnit.id);
    newMeasurementUnits[index] = editedMeasurementUnit;
    console.log(newMeasurementUnits);

    return updateObject(state, {
        loading: false,
        measurementUnits: newMeasurementUnits,
    });
};

const editMeasurementUnitsFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const deleteMeasurementUnitsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const deleteMeasurementUnitsSuccess = (state, action) => {
    const newMeasurementUnits = state.measurementUnits;
    const indexOfDeleted = newMeasurementUnits.findIndex(ing => ing.id === action.measurementUnitId);
    if (indexOfDeleted > -1) {
        newMeasurementUnits.splice(indexOfDeleted, 1);
    }
    console.log(newMeasurementUnits);

    return updateObject(state, {
        loading: false,
        measurementUnits: newMeasurementUnits
    });
};

const deleteMeasurementUnitsFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MEASUREMENT_UNITS_START: return fetchMeasurementUnitsStart(state, action);
        case actionTypes.FETCH_MEASUREMENT_UNITS_SUCCESS: return fetchMeasurementUnitsSuccess(state, action);
        case actionTypes.FETCH_MEASUREMENT_UNITS_FAIL: return fetchMeasurementUnitsFail(state, action);
        case actionTypes.ADD_MEASUREMENT_UNITS_START: return addMeasurementUnitsStart(state, action);
        case actionTypes.ADD_MEASUREMENT_UNITS_SUCCESS: return addMeasurementUnitsSuccess(state, action);
        case actionTypes.ADD_MEASUREMENT_UNITS_FAIL: return addMeasurementUnitsFail(state, action);
        case actionTypes.EDIT_MEASUREMENT_UNITS_START: return editMeasurementUnitsStart(state, action);
        case actionTypes.EDIT_MEASUREMENT_UNITS_SUCCESS: return editMeasurementUnitsSuccess(state, action);
        case actionTypes.EDIT_MEASUREMENT_UNITS_FAIL: return editMeasurementUnitsFail(state, action);
        case actionTypes.DELETE_MEASUREMENT_UNITS_START: return deleteMeasurementUnitsStart(state, action);
        case actionTypes.DELETE_MEASUREMENT_UNITS_SUCCESS: return deleteMeasurementUnitsSuccess(state, action);
        case actionTypes.DELETE_MEASUREMENT_UNITS_FAIL: return deleteMeasurementUnitsFail(state, action);
        default: return state;
    }
}

export default reducer;