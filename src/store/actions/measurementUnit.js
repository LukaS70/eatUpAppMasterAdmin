import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchMeasurementUnitsSuccess = (measurementUnits) => {
    return {
        type: actionTypes.FETCH_MEASUREMENT_UNITS_SUCCESS,
        measurementUnits: measurementUnits
    };
};

export const fetchMeasurementUnitsFail = (error) => {
    return {
        type: actionTypes.FETCH_MEASUREMENT_UNITS_FAIL,
        error: error
    };
};

export const fetchMeasurementUnitsStart = () => {
    return {
        type: actionTypes.FETCH_MEASUREMENT_UNITS_START
    };
};

export const fetchMeasurementUnits = (token) => {
    return dispatch => {
        dispatch(fetchMeasurementUnitsStart());
        axios.get('/measurement-units', {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                dispatch(fetchMeasurementUnitsSuccess(res.data.measurementUnits));
            }).catch(err => {
                dispatch(fetchMeasurementUnitsFail(err));
            });
    };
};

export const addMeasurementUnitsSuccess = (measurementUnitData) => {
    return {
        type: actionTypes.ADD_MEASUREMENT_UNITS_SUCCESS,
        measurementUnitData: measurementUnitData
    };
};

export const addMeasurementUnitsFail = (error) => {
    return {
        type: actionTypes.ADD_MEASUREMENT_UNITS_FAIL,
        error: error
    };
};

export const addMeasurementUnitsStart = () => {
    return {
        type: actionTypes.ADD_MEASUREMENT_UNITS_START
    };
};

export const addMeasurementUnits = (measurementUnitData, token) => {
    return dispatch => {
        dispatch(addMeasurementUnitsStart());
        axios.post('/measurement-units', measurementUnitData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                dispatch(addMeasurementUnitsSuccess(response.data.measurementUnit));
            }).catch(error => {
                dispatch(addMeasurementUnitsFail(error));
            });
    };
};

export const editMeasurementUnitsSuccess = (measurementUnitData) => {
    return {
        type: actionTypes.EDIT_MEASUREMENT_UNITS_SUCCESS,
        measurementUnitData: measurementUnitData
    };
};

export const editMeasurementUnitsFail = (error) => {
    return {
        type: actionTypes.EDIT_MEASUREMENT_UNITS_FAIL,
        error: error
    };
};

export const editMeasurementUnitsStart = () => {
    return {
        type: actionTypes.EDIT_MEASUREMENT_UNITS_START
    };
};

export const editMeasurementUnits = (measurementUnitId, measurementUnitData, token) => {
    return dispatch => {
        dispatch(editMeasurementUnitsStart());
        axios.put('/measurement-units/' + measurementUnitId, measurementUnitData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(editMeasurementUnitsSuccess(response.data.measurementUnit));
            }).catch(error => {
                dispatch(editMeasurementUnitsFail(error));
            });
    };
};

export const deleteMeasurementUnitsSuccess = (id) => {
    return {
        type: actionTypes.DELETE_MEASUREMENT_UNITS_SUCCESS,
        measurementUnitId: id,
    };
};

export const deleteMeasurementUnitsFail = (error) => {
    return {
        type: actionTypes.DELETE_MEASUREMENT_UNITS_FAIL,
        error: error
    };
};

export const deleteMeasurementUnitsStart = () => {
    return {
        type: actionTypes.DELETE_MEASUREMENT_UNITS_START
    };
};

export const deleteMeasurementUnits = (measurementUnitId, token) => {
    return dispatch => {
        dispatch(deleteMeasurementUnitsStart());
        axios.delete('/measurement-units/' + measurementUnitId, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(deleteMeasurementUnitsSuccess(measurementUnitId));
            }).catch(error => {
                dispatch(deleteMeasurementUnitsFail(error));
            });
    };
};