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

export const fetchMeasurementUnits = () => {
    return dispatch => {
        dispatch(fetchMeasurementUnitsStart());
        /* const queryParams = .... */
        axios.get('/measurementUnits.json')
            .then(res => {
                const fetchedMeasurementUnits = [];
                for (let key in res.data) {
                    fetchedMeasurementUnits.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchMeasurementUnitsSuccess(fetchedMeasurementUnits));
            }).catch(err => {
                dispatch(fetchMeasurementUnitsFail(err));
            });
    };
};

export const addMeasurementUnitsSuccess = (id, measurementUnitData) => {
    return {
        type: actionTypes.ADD_MEASUREMENT_UNITS_SUCCESS,
        measurementUnit: id,
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
        axios.post('/recipes.json?auth=' + token, measurementUnitData)
            .then(response => {
                /* console.log(response.data); */
                dispatch(addMeasurementUnitsSuccess(response.data.id, measurementUnitData));
            }).catch(error => {
                dispatch(addMeasurementUnitsFail(error));
            });
    };
};

export const editMeasurementUnitsSuccess = (id, measurementUnitData) => {
    return {
        type: actionTypes.EDIT_MEASUREMENT_UNITS_SUCCESS,
        measurementUnit: id,
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
        axios.put('/recipes/' + measurementUnitId + '.json?auth=' + token, measurementUnitData)
            .then(response => {
                console.log(response);
                dispatch(editMeasurementUnitsSuccess(measurementUnitId, response.data));
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
        axios.delete('/recipes/' + measurementUnitId + '.json?auth=' + token)
            .then(response => {
                console.log(response);
                dispatch(deleteMeasurementUnitsSuccess(measurementUnitId));
            }).catch(error => {
                dispatch(deleteMeasurementUnitsFail(error));
            });
    };
};