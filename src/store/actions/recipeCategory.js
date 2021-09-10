import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchRecipeCategoriesSuccess = (recipeCategories) => {
    return {
        type: actionTypes.FETCH_RECIPE_CATEGORIES_SUCCESS,
        recipeCategories: recipeCategories
    };
};

export const fetchRecipeCategoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_RECIPE_CATEGORIES_FAIL,
        error: error
    };
};

export const fetchRecipeCategoriesStart = () => {
    return {
        type: actionTypes.FETCH_RECIPE_CATEGORIES_START
    };
};

export const fetchRecipeCategories = (token) => {
    return dispatch => {
        dispatch(fetchRecipeCategoriesStart());
        axios.get('/recipe-categories', {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                dispatch(fetchRecipeCategoriesSuccess(res.data.recipeCategories));
            }).catch(err => {
                dispatch(fetchRecipeCategoriesFail(err));
            });
    };
};

export const addRecipeCategoriesSuccess = (recipeCategoryData) => {
    return {
        type: actionTypes.ADD_RECIPE_CATEGORIES_SUCCESS,
        recipeCategoryData: recipeCategoryData
    };
};

export const addRecipeCategoriesFail = (error) => {
    return {
        type: actionTypes.ADD_RECIPE_CATEGORIES_FAIL,
        error: error
    };
};

export const addRecipeCategoriesStart = () => {
    return {
        type: actionTypes.ADD_RECIPE_CATEGORIES_START
    };
};

export const addRecipeCategories = (recipeCategoryData, token) => {
    return dispatch => {
        dispatch(addRecipeCategoriesStart());
        axios.post('/recipe-categories', recipeCategoryData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                dispatch(addRecipeCategoriesSuccess(response.data.recipeCategory));
            }).catch(error => {
                dispatch(addRecipeCategoriesFail(error));
            });
    };
};

export const editRecipeCategoriesSuccess = (recipeCategoryData) => {
    return {
        type: actionTypes.EDIT_RECIPE_CATEGORIES_SUCCESS,
        recipeCategoryData: recipeCategoryData
    };
};

export const editRecipeCategoriesFail = (error) => {
    return {
        type: actionTypes.EDIT_RECIPE_CATEGORIES_FAIL,
        error: error
    };
};

export const editRecipeCategoriesStart = () => {
    return {
        type: actionTypes.EDIT_RECIPE_CATEGORIES_START
    };
};

export const editRecipeCategories = (recipeCategoryId, recipeCategoryData, token) => {
    return dispatch => {
        dispatch(editRecipeCategoriesStart());
        axios.patch('/recipe-categories/' + recipeCategoryId, recipeCategoryData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(editRecipeCategoriesSuccess(response.data.recipeCategory));
            }).catch(error => {
                dispatch(editRecipeCategoriesFail(error));
            });
    };
};

export const deleteRecipeCategoriesSuccess = (id) => {
    return {
        type: actionTypes.DELETE_RECIPE_CATEGORIES_SUCCESS,
        recipeCategoryId: id,
    };
};

export const deleteRecipeCategoriesFail = (error) => {
    return {
        type: actionTypes.DELETE_RECIPE_CATEGORIES_FAIL,
        error: error
    };
};

export const deleteRecipeCategoriesStart = () => {
    return {
        type: actionTypes.DELETE_RECIPE_CATEGORIES_START
    };
};

export const deleteRecipeCategories = (recipeCategoryId, token) => {
    return dispatch => {
        dispatch(deleteRecipeCategoriesStart());
        axios.delete('/recipe-categories/' + recipeCategoryId, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(deleteRecipeCategoriesSuccess(recipeCategoryId));
            }).catch(error => {
                dispatch(deleteRecipeCategoriesFail(error));
            });
    };
};