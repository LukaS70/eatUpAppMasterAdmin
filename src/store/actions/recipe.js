import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchRecipesSuccess = (recipes) => {
    return {
        type: actionTypes.FETCH_RECIPES_SUCCESS,
        recipes: recipes
    };
};

export const fetchRecipesFail = (error) => {
    return {
        type: actionTypes.FETCH_RECIPES_FAIL,
        error: error
    };
};

export const fetchRecipesStart = () => {
    return {
        type: actionTypes.FETCH_RECIPES_START
    };
};

export const fetchRecipes = (token) => {
    return dispatch => {
        dispatch(fetchRecipesStart());
        axios.get('/recipes', {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                const fetchedRecipes = res.data.recipes;
                dispatch(fetchRecipesSuccess(fetchedRecipes));
            }).catch(err => {
                dispatch(fetchRecipesFail(err));
            });
    };
};

export const addRecipeSuccess = (recipeData) => {
    return {
        type: actionTypes.ADD_RECIPE_SUCCESS,
        recipeData: recipeData
    };
};

export const addRecipeFail = (error) => {
    return {
        type: actionTypes.ADD_RECIPE_FAIL,
        error: error
    };
};

export const addRecipeStart = () => {
    return {
        type: actionTypes.ADD_RECIPE_START
    };
};

export const addRecipe = (recipeData, token) => {
    return dispatch => {
        dispatch(addRecipeStart());
        axios.post('/recipes', recipeData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(addRecipeSuccess(response.data.recipe));
            }).catch(error => {
                dispatch(addRecipeFail(error));
            });
    };
};

export const editRecipeSuccess = (recipeData) => {
    return {
        type: actionTypes.EDIT_RECIPE_SUCCESS,
        recipeData: recipeData
    };
};

export const editRecipeFail = (error) => {
    return {
        type: actionTypes.EDIT_RECIPE_FAIL,
        error: error
    };
};

export const editRecipeStart = () => {
    return {
        type: actionTypes.EDIT_RECIPE_START
    };
};

export const editRecipe = (recipeId, recipeData, token) => {
    return dispatch => {
        dispatch(editRecipeStart());
        axios.patch('/recipes/' + recipeId, recipeData, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(editRecipeSuccess(response.data.recipe));
            }).catch(error => {
                dispatch(editRecipeFail(error));
            });
    };
};

export const deleteRecipeSuccess = (id) => {
    return {
        type: actionTypes.DELETE_RECIPE_SUCCESS,
        recipeId: id
    };
};

export const deleteRecipeFail = (error) => {
    return {
        type: actionTypes.DELETE_RECIPE_FAIL,
        error: error
    };
};

export const deleteRecipeStart = () => {
    return {
        type: actionTypes.DELETE_RECIPE_START
    };
};

export const deleteRecipe = (recipeId, token) => {
    return dispatch => {
        dispatch(deleteRecipeStart());
        axios.delete('/recipes/' + recipeId, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(deleteRecipeSuccess(recipeId));
            }).catch(error => {
                dispatch(deleteRecipeFail(error));
            });
    };
};

export const makeRecipePublicSuccess = (recipeData) => {
    return {
        type: actionTypes.MAKE_RECIPE_PUBLIC_SUCCESS,
        recipeData: recipeData
    };
};

export const makeRecipePublicFail = (error) => {
    return {
        type: actionTypes.MAKE_RECIPE_PUBLIC_FAIL,
        error: error
    };
};

export const makeRecipePublicStart = () => {
    return {
        type: actionTypes.MAKE_RECIPE_PUBLIC_START
    };
};

export const makeRecipePublic = (recId, token) => {
    return dispatch => {
        dispatch(makeRecipePublicSuccess());
        axios.patch('/recipes/make-public' + recId, {}, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(editRecipeSuccess(response.data.recipe));
            }).catch(error => {
                dispatch(makeRecipePublicFail(error));
            });
    };
};

export const unmakeRecipePublicSuccess = (recipeData) => {
    return {
        type: actionTypes.UNMAKE_RECIPE_PUBLIC_SUCCESS,
        recipeData: recipeData
    };
};

export const unmakeRecipePublicFail = (error) => {
    return {
        type: actionTypes.UNMAKE_RECIPE_PUBLIC_FAIL,
        error: error
    };
};

export const unmakeRecipePublicStart = () => {
    return {
        type: actionTypes.UNMAKE_RECIPE_PUBLIC_START
    };
};

export const unmakeRecipePublic = (recId, token) => {
    return dispatch => {
        dispatch(unmakeRecipePublicStart());
        axios.patch('/recipes/unmake-public' + recId, {}, {headers: { 'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response);
                dispatch(unmakeRecipePublicSuccess(response.data.recipe));
            }).catch(error => {
                dispatch(unmakeRecipePublicFail(error));
            });
    };
};