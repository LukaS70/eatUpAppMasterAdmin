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

export const fetchIngredientCategories = () => {
    return dispatch => {
        dispatch(fetchIngredientCategoriesStart());
        /* const queryParams = .... */
        axios.get('/ingredientCategories.json')
            .then(res => {
                const fetchedIngredientCategories = [];
                for (let key in res.data) {
                    fetchedIngredientCategories.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchIngredientCategoriesSuccess(fetchedIngredientCategories));
            }).catch(err => {
                dispatch(fetchIngredientCategoriesFail(err));
            });
    };
};

export const addIngredientCategoriesSuccess = (id, ingredientCategoryData) => {
    return {
        type: actionTypes.ADD_INGREDIENT_CATEGORIES_SUCCESS,
        ingredientCategory: id,
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
        axios.post('/recipes.json?auth=' + token, ingredientCategoryData)
            .then(response => {
                /* console.log(response.data); */
                dispatch(addIngredientCategoriesSuccess(response.data.id, ingredientCategoryData));
            }).catch(error => {
                dispatch(addIngredientCategoriesFail(error));
            });
    };
};

export const editIngredientCategoriesSuccess = (id, ingredientCategoryData) => {
    return {
        type: actionTypes.EDIT_INGREDIENT_CATEGORIES_SUCCESS,
        ingredientCategory: id,
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
        axios.put('/recipes/' + ingredientCategoryId + '.json?auth=' + token, ingredientCategoryData)
            .then(response => {
                console.log(response);
                dispatch(editIngredientCategoriesSuccess(ingredientCategoryId, response.data));
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
        axios.delete('/recipes/' + ingredientCategoryId + '.json?auth=' + token)
            .then(response => {
                console.log(response);
                dispatch(deleteIngredientCategoriesSuccess(ingredientCategoryId));
            }).catch(error => {
                dispatch(deleteIngredientCategoriesFail(error));
            });
    };
};