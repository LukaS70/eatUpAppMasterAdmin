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

export const fetchRecipes = () => {
    return dispatch => {
        dispatch(fetchRecipesStart());
        /* const queryParams = .... */
        axios.get('/recipes.json')
            .then(res => {
                const fetchedRecipes = [];
                for (let key in res.data) {
                    fetchedRecipes.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchRecipesSuccess(fetchedRecipes));
            }).catch(err => {
                dispatch(fetchRecipesFail(err));
            });
    };
};

export const addRecipeSuccess = (id, recipeData) => {
    return {
        type: actionTypes.ADD_RECIPE_SUCCESS,
        recipeId: id,
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
        axios.post('/recipes.json?auth=' + token, recipeData)
            .then(response => {
                /* console.log(response.data); */
                dispatch(addRecipeSuccess(response.data.name, recipeData));
            }).catch(error => {
                dispatch(addRecipeFail(error));
            });
    };
};

export const editRecipeSuccess = (id, recipeData) => {
    return {
        type: actionTypes.EDIT_RECIPE_SUCCESS,
        recipeId: id,
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
        axios.put('/recipes/' + recipeId + '.json?auth=' + token, recipeData)
            .then(response => {
                console.log(response);
                dispatch(editRecipeSuccess(recipeId, response.data));
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
        axios.delete('/recipes/' + recipeId + '.json?auth=' + token)
            .then(response => {
                console.log(response);
                dispatch(deleteRecipeSuccess(recipeId));
            }).catch(error => {
                dispatch(deleteRecipeFail(error));
            });
    };
};