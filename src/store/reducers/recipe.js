import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    recipes: [],
    loading: false,
    filterConfig: {
        calories: {
            min: null,
            max: null
        },
        totalFats: {
            min: null,
            max: null
        },
        saturatedFats: {
            min: null,
            max: null
        },
        totalCarbohydrates: {
            min: null,
            max: null
        },
        sugar: {
            min: null,
            max: null
        },
        proteine: {
            min: null,
            max: null
        }
    },
};

const fetchRecipesStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchRecipesSuccess = (state, action) => {
    return updateObject(state, {
        recipes: action.recipes,
        loading: false,
        filterConfig: {
            calories: {
                min: Math.min.apply(Math, action.recipes.map(function (o) { return o.calories; })),
                max: Math.max.apply(Math, action.recipes.map(function (o) { return o.calories; }))
            },
            totalFats: {
                min: Math.min.apply(Math, action.recipes.map(function (o) { return o.totalFats; })),
                max: Math.max.apply(Math, action.recipes.map(function (o) { return o.totalFats; }))
            },
            saturatedFats: {
                min: Math.min.apply(Math, action.recipes.map(function (o) { return o.saturatedFats; })),
                max: Math.max.apply(Math, action.recipes.map(function (o) { return o.saturatedFats; }))
            },
            totalCarbohydrates: {
                min: Math.min.apply(Math, action.recipes.map(function (o) { return o.totalCarbohydrates; })),
                max: Math.max.apply(Math, action.recipes.map(function (o) { return o.totalCarbohydrates; }))
            },
            sugar: {
                min: Math.min.apply(Math, action.recipes.map(function (o) { return o.sugar; })),
                max: Math.max.apply(Math, action.recipes.map(function (o) { return o.sugar; }))
            },
            proteine: {
                min: Math.min.apply(Math, action.recipes.map(function (o) { return o.proteine; })),
                max: Math.max.apply(Math, action.recipes.map(function (o) { return o.proteine; }))
            }
        }
    });
};

const fetchRecipesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const addRecipeStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addRecipeSuccess = (state, action) => {
    const newRecipe = updateObject(action.recipeData, { id: action.recipeId });
    return updateObject(state, {
        loading: false,
        recipes: state.recipes.concat(newRecipe),
    });
};

const addRecipeFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const editRecipeStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const editRecipeSuccess = (state, action) => {
    const editedRecipe = updateObject(action.recipeData, { id: action.recipeId });
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
        default: return state;
    }
}

export default reducer;