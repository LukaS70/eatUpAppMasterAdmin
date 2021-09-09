import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    recipeCategories: [],
    loading: false
};

const fetchRecipeCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchRecipeCategoriesSuccess = (state, action) => {
    /* let categories = action.recipeCategories.map(category => (
        { value: category.name, displayValue: category.name}
    )) */
    return updateObject(state, {
        recipeCategories: action.recipeCategories,
        loading: false
    });
};

const fetchRecipeCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const addRecipeCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addRecipeCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        recipeCategories: state.recipeCategories.concat(action.recipeCategoryData),
    });
};

const addRecipeCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const editRecipeCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const editRecipeCategoriesSuccess = (state, action) => {
    const editedRecipeCategory = action.recipeCategoryData;
    const newRecipeCategories = state.recipeCategories;
    const index = newRecipeCategories.findIndex(ing => ing.id === editedRecipeCategory.id);
    newRecipeCategories[index] = editedRecipeCategory;
    console.log(newRecipeCategories);

    return updateObject(state, {
        loading: false,
        recipeCategories: newRecipeCategories,
    });
};

const editRecipeCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const deleteRecipeCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const deleteRecipeCategoriesSuccess = (state, action) => {
    const newRecipeCategories = state.recipeCategories;
    const indexOfDeleted = newRecipeCategories.findIndex(ing => ing.id === action.recipeCategoryId);
    if (indexOfDeleted > -1) {
        newRecipeCategories.splice(indexOfDeleted, 1);
    }
    console.log(newRecipeCategories);

    return updateObject(state, {
        loading: false,
        recipeCategories: newRecipeCategories
    });
};

const deleteRecipeCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RECIPE_CATEGORIES_START: return fetchRecipeCategoriesStart(state, action);
        case actionTypes.FETCH_RECIPE_CATEGORIES_SUCCESS: return fetchRecipeCategoriesSuccess(state, action);
        case actionTypes.FETCH_RECIPE_CATEGORIES_FAIL: return fetchRecipeCategoriesFail(state, action);
        case actionTypes.ADD_RECIPE_CATEGORIES_START: return addRecipeCategoriesStart(state, action);
        case actionTypes.ADD_RECIPE_CATEGORIES_SUCCESS: return addRecipeCategoriesSuccess(state, action);
        case actionTypes.ADD_RECIPE_CATEGORIES_FAIL: return addRecipeCategoriesFail(state, action);
        case actionTypes.EDIT_RECIPE_CATEGORIES_START: return editRecipeCategoriesStart(state, action);
        case actionTypes.EDIT_RECIPE_CATEGORIES_SUCCESS: return editRecipeCategoriesSuccess(state, action);
        case actionTypes.EDIT_RECIPE_CATEGORIES_FAIL: return editRecipeCategoriesFail(state, action);
        case actionTypes.DELETE_RECIPE_CATEGORIES_START: return deleteRecipeCategoriesStart(state, action);
        case actionTypes.DELETE_RECIPE_CATEGORIES_SUCCESS: return deleteRecipeCategoriesSuccess(state, action);
        case actionTypes.DELETE_RECIPE_CATEGORIES_FAIL: return deleteRecipeCategoriesFail(state, action);
        default: return state;
    }
}

export default reducer;