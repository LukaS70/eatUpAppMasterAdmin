import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: [],
    loading: false,
};

const fetchIngredientsStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchIngredientsSuccess = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        loading: false,
    });
};

const fetchIngredientsFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const addIngredientStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addIngredientSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        ingredients: state.ingredients.concat(action.ingredientData),
    });
};

const addIngredientFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const editIngredientStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const editIngredientSuccess = (state, action) => {
    const editedIngredient = action.ingredientData;
    const newIngredients = state.ingredients;
    const index = newIngredients.findIndex(ing => ing.id === editedIngredient.id);
    newIngredients[index] = editedIngredient;
    console.log(newIngredients);

    return updateObject(state, {
        loading: false,
        ingredients: newIngredients,
    });
};

const editIngredientFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const deleteIngredientStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const deleteIngredientSuccess = (state, action) => {
    const newIngredients = state.ingredients;
    const indexOfDeleted = newIngredients.findIndex(ing => ing.id === action.ingredientId);
    if (indexOfDeleted > -1) {
        newIngredients.splice(indexOfDeleted, 1);
    }
    console.log(newIngredients);

    return updateObject(state, {
        loading: false,
        ingredients: newIngredients
    });
};

const deleteIngredientFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const makeIngredientPublicStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const makeIngredientPublicSuccess = (state, action) => {
    const editedIngredient = action.ingredientData;
    const newIngredients = state.ingredients;
    const index = newIngredients.findIndex(ing => ing.id === editedIngredient.id);
    newIngredients[index] = editedIngredient;
    console.log(newIngredients);

    return updateObject(state, {
        loading: false,
        ingredients: newIngredients,
    });
};

const makeIngredientPublicFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const unmakeIngredientPublicStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const unmakeIngredientPublicSuccess = (state, action) => {
    const editedIngredient = action.ingredientData;
    const newIngredients = state.ingredients;
    const index = newIngredients.findIndex(ing => ing.id === editedIngredient.id);
    newIngredients[index] = editedIngredient;
    console.log(newIngredients);

    return updateObject(state, {
        loading: false,
        ingredients: newIngredients,
    });
};

const unmakeIngredientPublicFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS_START: return fetchIngredientsStart(state, action);
        case actionTypes.FETCH_INGREDIENTS_SUCCESS: return fetchIngredientsSuccess(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action);
        case actionTypes.ADD_INGREDIENT_START: return addIngredientStart(state, action);
        case actionTypes.ADD_INGREDIENT_SUCCESS: return addIngredientSuccess(state, action);
        case actionTypes.ADD_INGREDIENT_FAIL: return addIngredientFail(state, action);
        case actionTypes.EDIT_INGREDIENT_START: return editIngredientStart(state, action);
        case actionTypes.EDIT_INGREDIENT_SUCCESS: return editIngredientSuccess(state, action);
        case actionTypes.EDIT_INGREDIENT_FAIL: return editIngredientFail(state, action);
        case actionTypes.DELETE_INGREDIENT_START: return deleteIngredientStart(state, action);
        case actionTypes.DELETE_INGREDIENT_SUCCESS: return deleteIngredientSuccess(state, action);
        case actionTypes.DELETE_INGREDIENT_FAIL: return deleteIngredientFail(state, action);
        case actionTypes.MAKE_INGREDIENT_PUBLIC_START: return makeIngredientPublicStart(state, action);
        case actionTypes.MAKE_INGREDIENT_PUBLIC_SUCCESS: return makeIngredientPublicSuccess(state, action);
        case actionTypes.MAKE_INGREDIENT_PUBLIC_FAIL: return makeIngredientPublicFail(state, action);
        case actionTypes.UNMAKE_INGREDIENT_PUBLIC_START: return unmakeIngredientPublicStart(state, action);
        case actionTypes.UNMAKE_INGREDIENT_PUBLIC_SUCCESS: return unmakeIngredientPublicSuccess(state, action);
        case actionTypes.UNMAKE_INGREDIENT_PUBLIC_FAIL: return unmakeIngredientPublicFail(state, action);
        default: return state;
    }
}

export default reducer;