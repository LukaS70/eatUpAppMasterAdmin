import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    recipes: [],
    loading: false
};

const fetchRecipesStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchRecipesSuccess = (state, action) => {
    return updateObject(state, {
        recipes: action.recipes,
        loading: false
    });
};

const fetchRecipesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const addRecipeStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addRecipeSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        recipes: state.recipes.concat(action.recipeData),
    });
};

const addRecipeFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const editRecipeStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const editRecipeSuccess = (state, action) => {
    const editedRecipe = action.recipeData;
    const newRecipes = state.recipes;
    const index = newRecipes.findIndex(ing => ing.id === editedRecipe.id);
    newRecipes[index] = editedRecipe;
    console.log(newRecipes);

    return updateObject(state, {
        loading: false,
        recipes: newRecipes,
    });
};

const editRecipeFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const deleteRecipeStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const deleteRecipeSuccess = (state, action) => {
    const newRecipes = state.recipes;
    const indexOfDeleted = newRecipes.findIndex(rec => rec.id === action.recipeId);
    if (indexOfDeleted > -1) {
        newRecipes.splice(indexOfDeleted, 1);
    }
    console.log(newRecipes);

    return updateObject(state, {
        loading: false,
        recipes: newRecipes
    });
};

const deleteRecipeFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const makeRecipePublicStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const makeRecipePublicSuccess = (state, action) => {
    const editedRecipe = action.recipeData;
    const newRecipes = state.recipes;
    const index = newRecipes.findIndex(ing => ing.id === editedRecipe.id);
    newRecipes[index] = editedRecipe;
    console.log(newRecipes);

    return updateObject(state, {
        loading: false,
        recipes: newRecipes,
    });
};

const makeRecipePublicFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const unmakeRecipePublicStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const unmakeRecipePublicSuccess = (state, action) => {
    const editedRecipe = action.recipeData;
    const newRecipes = state.recipes;
    const index = newRecipes.findIndex(ing => ing.id === editedRecipe.id);
    newRecipes[index] = editedRecipe;
    console.log(newRecipes);

    return updateObject(state, {
        loading: false,
        recipes: newRecipes,
    });
};

const unmakeRecipePublicFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RECIPES_START: return fetchRecipesStart(state, action);
        case actionTypes.FETCH_RECIPES_SUCCESS: return fetchRecipesSuccess(state, action);
        case actionTypes.FETCH_RECIPES_FAIL: return fetchRecipesFail(state, action);
        case actionTypes.ADD_RECIPE_START: return addRecipeStart(state, action);
        case actionTypes.ADD_RECIPE_SUCCESS: return addRecipeSuccess(state, action);
        case actionTypes.ADD_RECIPE_FAIL: return addRecipeFail(state, action);
        case actionTypes.EDIT_RECIPE_START: return editRecipeStart(state, action);
        case actionTypes.EDIT_RECIPE_SUCCESS: return editRecipeSuccess(state, action);
        case actionTypes.EDIT_RECIPE_FAIL: return editRecipeFail(state, action);
        case actionTypes.DELETE_RECIPE_START: return deleteRecipeStart(state, action);
        case actionTypes.DELETE_RECIPE_SUCCESS: return deleteRecipeSuccess(state, action);
        case actionTypes.DELETE_RECIPE_FAIL: return deleteRecipeFail(state, action);
        case actionTypes.MAKE_RECIPE_PUBLIC_START: return makeRecipePublicStart(state, action);
        case actionTypes.MAKE_RECIPE_PUBLIC_SUCCESS: return makeRecipePublicSuccess(state, action);
        case actionTypes.MAKE_RECIPE_PUBLIC_FAIL: return makeRecipePublicFail(state, action);
        case actionTypes.UNMAKE_INGREDIENT_PUBLIC_START: return unmakeRecipePublicStart(state, action);
        case actionTypes.UNMAKE_INGREDIENT_PUBLIC_SUCCESS: return unmakeRecipePublicSuccess(state, action);
        case actionTypes.UNMAKE_INGREDIENT_PUBLIC_FAIL: return unmakeRecipePublicFail(state, action);
        default: return state;
    }
}

export default reducer;