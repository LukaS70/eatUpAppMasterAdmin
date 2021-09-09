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

export const fetchIngredients = () => {
    return dispatch => {
        dispatch(fetchIngredientsStart());
        /* const queryParams = .... */
        axios.get('/ingredients.json')
            .then(res => {
                const fetchedIngredients = [];
                for (let key in res.data) {
                    fetchedIngredients.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchIngredientsSuccess(fetchedIngredients));
            }).catch(err => {
                dispatch(fetchIngredientsFail(err));
            });
    };
};

export const addIngredientSuccess = (id, ingredientData) => {
    return {
        type: actionTypes.ADD_INGREDIENT_SUCCESS,
        ingredientId: id,
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
        axios.post('/ingredients.json?auth=' + token, ingredientData)
            .then(response => {
                /* console.log(response.data); */
                dispatch(addIngredientSuccess(response.data.name, ingredientData));
            }).catch(error => {
                dispatch(addIngredientFail(error));
            });
    };
};

export const editIngredientSuccess = (id, ingredientData) => {
    return {
        type: actionTypes.EDIT_INGREDIENT_SUCCESS,
        ingredientId: id,
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
        axios.put('/ingredients/' + ingId + '.json?auth=' + token, ingredientData)
            .then(response => {
                console.log(response);
                dispatch(editIngredientSuccess(ingId, response.data));
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
        axios.delete('/ingredients/' + ingId + '.json?auth=' + token)
            .then(response => {
                console.log(response);
                dispatch(deleteIngredientSuccess(ingId));
            }).catch(error => {
                dispatch(deleteIngredientFail(error));
            });
    };
};