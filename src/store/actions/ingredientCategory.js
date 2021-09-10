import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchIngredientCategoriesSuccess = (ingredientCategories) => {
    return {
        type: actionTypes.FETCH_INGREDIENT_CATEGORIES_SUCCESS,
        ingredientCategories: ingredientCategories
    };
};

export const fetchIngredientCategoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENT_CATEGORIES_FAIL,
        error: error
    };
};

export const fetchIngredientCategoriesStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_CATEGORIES_START
    };
};

export const fetchIngredientCategories = (token) => {
    return dispatch => {
        dispatch(fetchIngredientCategoriesStart());
        axios.get('/ingredient-categories', {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                dispatch(fetchIngredientCategoriesSuccess(res.data.ingredientCategories));
            }).catch(err => {
                dispatch(fetchIngredientCategoriesFail(err));
            });
    };
};

export const addIngredientCategoriesSuccess = (ingredientCategoryData) => {
    return {
        type: actionTypes.ADD_INGREDIENT_CATEGORIES_SUCCESS,
        ingredientCategoryData: ingredientCategoryData
    };
};

export const addIngredientCategoriesFail = (error) => {
    return {
        type: actionTypes.ADD_INGREDIENT_CATEGORIES_FAIL,
        error: error
    };
};

export const addIngredientCategoriesStart = () => {
    return {
        type: actionTypes.ADD_INGREDIENT_CATEGORIES_START
    };
};

export const addIngredientCategories = (ingredientCategoryData, token) => {
    return dispatch => {
        dispatch(addIngredientCategoriesStart());
        axios.post('/ingredient-categories', ingredientCategoryData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                dispatch(addIngredientCategoriesSuccess(response.data.ingredientCategory));
            }).catch(error => {
                dispatch(addIngredientCategoriesFail(error));
            });
    };
};

export const editIngredientCategoriesSuccess = (ingredientCategoryData) => {
    return {
        type: actionTypes.EDIT_INGREDIENT_CATEGORIES_SUCCESS,
        ingredientCategoryData: ingredientCategoryData
    };
};

export const editIngredientCategoriesFail = (error) => {
    return {
        type: actionTypes.EDIT_INGREDIENT_CATEGORIES_FAIL,
        error: error
    };
};

export const editIngredientCategoriesStart = () => {
    return {
        type: actionTypes.EDIT_INGREDIENT_CATEGORIES_START
    };
};

export const editIngredientCategories = (ingredientCategoryId, ingredientCategoryData, token) => {
    return dispatch => {
        dispatch(editIngredientCategoriesStart());
        axios.patch('/ingredient-categories/' + ingredientCategoryId, ingredientCategoryData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(editIngredientCategoriesSuccess(response.data.ingredientCategory));
            }).catch(error => {
                dispatch(editIngredientCategoriesFail(error));
            });
    };
};

export const deleteIngredientCategoriesSuccess = (id) => {
    return {
        type: actionTypes.DELETE_INGREDIENT_CATEGORIES_SUCCESS,
        ingredientCategoryId: id,
    };
};

export const deleteIngredientCategoriesFail = (error) => {
    return {
        type: actionTypes.DELETE_INGREDIENT_CATEGORIES_FAIL,
        error: error
    };
};

export const deleteIngredientCategoriesStart = () => {
    return {
        type: actionTypes.DELETE_INGREDIENT_CATEGORIES_START
    };
};

export const deleteIngredientCategories = (ingredientCategoryId, token) => {
    return dispatch => {
        dispatch(deleteIngredientCategoriesStart());
        axios.delete('/ingredient-categories/' + ingredientCategoryId, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(deleteIngredientCategoriesSuccess(ingredientCategoryId));
            }).catch(error => {
                dispatch(deleteIngredientCategoriesFail(error));
            });
    };
};