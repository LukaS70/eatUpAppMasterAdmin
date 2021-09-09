import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredientCategories: [],
    loading: false
};

const fetchIngredientCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchIngredientCategoriesSuccess = (state, action) => {
    /* let categories = action.ingredientCategories.map(category => (
        { value: category.name, displayValue: category.name}
    )) */
    return updateObject(state, {
        ingredientCategories: action.ingredientCategories,
        loading: false
    });
};

const fetchIngredientCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const addIngredientCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addIngredientCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        ingredientCategories: state.ingredientCategories.concat(action.ingredientCategoryData),
    });
};

const addIngredientCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const editIngredientCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const editIngredientCategoriesSuccess = (state, action) => {
    const editedIngredientCategory = action.ingredientCategoryData;
    const newIngredientCategories = state.ingredientCategories;
    const index = newIngredientCategories.findIndex(ing => ing.id === editedIngredientCategory.id);
    newIngredientCategories[index] = editedIngredientCategory;
    console.log(newIngredientCategories);

    return updateObject(state, {
        loading: false,
        ingredientCategories: newIngredientCategories,
    });
};

const editIngredientCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const deleteIngredientCategoriesStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const deleteIngredientCategoriesSuccess = (state, action) => {
    const newIngredientCategories = state.ingredientCategories;
    const indexOfDeleted = newIngredientCategories.findIndex(ing => ing.id === action.ingredientCategoryId);
    if (indexOfDeleted > -1) {
        newIngredientCategories.splice(indexOfDeleted, 1);
    }
    console.log(newIngredientCategories);

    return updateObject(state, {
        loading: false,
        ingredientCategories: newIngredientCategories
    });
};

const deleteIngredientCategoriesFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENT_CATEGORIES_START: return fetchIngredientCategoriesStart(state, action);
        case actionTypes.FETCH_INGREDIENT_CATEGORIES_SUCCESS: return fetchIngredientCategoriesSuccess(state, action);
        case actionTypes.FETCH_INGREDIENT_CATEGORIES_FAIL: return fetchIngredientCategoriesFail(state, action);
        case actionTypes.ADD_INGREDIENT_CATEGORIES_START: return addIngredientCategoriesStart(state, action);
        case actionTypes.ADD_INGREDIENT_CATEGORIES_SUCCESS: return addIngredientCategoriesSuccess(state, action);
        case actionTypes.ADD_INGREDIENT_CATEGORIES_FAIL: return addIngredientCategoriesFail(state, action);
        case actionTypes.EDIT_INGREDIENT_CATEGORIES_START: return editIngredientCategoriesStart(state, action);
        case actionTypes.EDIT_INGREDIENT_CATEGORIES_SUCCESS: return editIngredientCategoriesSuccess(state, action);
        case actionTypes.EDIT_INGREDIENT_CATEGORIES_FAIL: return editIngredientCategoriesFail(state, action);
        case actionTypes.DELETE_INGREDIENT_CATEGORIES_START: return deleteIngredientCategoriesStart(state, action);
        case actionTypes.DELETE_INGREDIENT_CATEGORIES_SUCCESS: return deleteIngredientCategoriesSuccess(state, action);
        case actionTypes.DELETE_INGREDIENT_CATEGORIES_FAIL: return deleteIngredientCategoriesFail(state, action);
        default: return state;
    }
}

export default reducer;