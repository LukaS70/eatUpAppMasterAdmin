import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
        error: error
    };
};

export const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START
    };
};

export const fetchIngredients = (token) => {
    return dispatch => {
        dispatch(fetchIngredientsStart());
        axios.get('/ingredients', {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                const fetchedIngredients = res.data.ingredients;
                dispatch(fetchIngredientsSuccess(fetchedIngredients));
            }).catch(err => {
                dispatch(fetchIngredientsFail(err));
            });
    };
};

export const addIngredientSuccess = (ingredientData) => {
    return {
        type: actionTypes.ADD_INGREDIENT_SUCCESS,
        ingredientData: ingredientData
    };
};

export const addIngredientFail = (error) => {
    return {
        type: actionTypes.ADD_INGREDIENT_FAIL,
        error: error
    };
};

export const addIngredientStart = () => {
    return {
        type: actionTypes.ADD_INGREDIENT_START
    };
};

export const addIngredient = (ingredientData, token) => {
    return dispatch => {
        dispatch(addIngredientStart());
        axios.post('/ingredients', ingredientData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(addIngredientSuccess(response.data.ingredient));
            }).catch(error => {
                dispatch(addIngredientFail(error));
            });
    };
};

export const editIngredientSuccess = (ingredientData) => {
    return {
        type: actionTypes.EDIT_INGREDIENT_SUCCESS,
        ingredientData: ingredientData
    };
};

export const editIngredientFail = (error) => {
    return {
        type: actionTypes.EDIT_INGREDIENT_FAIL,
        error: error
    };
};

export const editIngredientStart = () => {
    return {
        type: actionTypes.EDIT_INGREDIENT_START
    };
};

export const editIngredient = (ingId, ingredientData, token) => {
    return dispatch => {
        dispatch(editIngredientStart());
        axios.patch('/ingredients/' + ingId, ingredientData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(editIngredientSuccess(response.data.ingredient));
            }).catch(error => {
                dispatch(editIngredientFail(error));
            });
    };
};

export const deleteIngredientSuccess = (id) => {
    return {
        type: actionTypes.DELETE_INGREDIENT_SUCCESS,
        ingredientId: id
    };
};

export const deleteIngredientFail = (error) => {
    return {
        type: actionTypes.DELETE_INGREDIENT_FAIL,
        error: error
    };
};

export const deleteIngredientStart = () => {
    return {
        type: actionTypes.DELETE_INGREDIENT_START
    };
};

export const deleteIngredient = (ingId, token) => {
    return dispatch => {
        dispatch(deleteIngredientStart());
        axios.delete('/ingredients/' + ingId, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(deleteIngredientSuccess(ingId));
            }).catch(error => {
                dispatch(deleteIngredientFail(error));
            });
    };
};

export const makeIngredientPublicSuccess = (ingredientData) => {
    return {
        type: actionTypes.MAKE_INGREDIENT_PUBLIC_SUCCESS,
        ingredientData: ingredientData
    };
};

export const makeIngredientPublicFail = (error) => {
    return {
        type: actionTypes.MAKE_INGREDIENT_PUBLIC_FAIL,
        error: error
    };
};

export const makeIngredientPublicStart = () => {
    return {
        type: actionTypes.MAKE_INGREDIENT_PUBLIC_START
    };
};

export const makeIngredientPublic = (ingId, token) => {
    return dispatch => {
        dispatch(makeIngredientPublicSuccess());
        axios.patch('/ingredients/make-public' + ingId, {}, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(editIngredientSuccess(response.data.ingredient));
            }).catch(error => {
                dispatch(makeIngredientPublicFail(error));
            });
    };
};

export const unmakeIngredientPublicSuccess = (ingredientData) => {
    return {
        type: actionTypes.UNMAKE_INGREDIENT_PUBLIC_SUCCESS,
        ingredientData: ingredientData
    };
};

export const unmakeIngredientPublicFail = (error) => {
    return {
        type: actionTypes.UNMAKE_INGREDIENT_PUBLIC_FAIL,
        error: error
    };
};

export const unmakeIngredientPublicStart = () => {
    return {
        type: actionTypes.UNMAKE_INGREDIENT_PUBLIC_START
    };
};

export const unmakeIngredientPublic = (ingId, token) => {
    return dispatch => {
        dispatch(unmakeIngredientPublicStart());
        axios.patch('/ingredients/unmake-public' + ingId, {}, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(unmakeIngredientPublicSuccess(response.data.ingredient));
            }).catch(error => {
                dispatch(unmakeIngredientPublicFail(error));
            });
    };
};