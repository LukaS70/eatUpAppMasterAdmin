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

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RECIPE_CATEGORIES_START: return fetchRecipeCategoriesStart(state, action);
        case actionTypes.FETCH_RECIPE_CATEGORIES_SUCCESS: return fetchRecipeCategoriesSuccess(state, action);
        case actionTypes.FETCH_RECIPE_CATEGORIES_FAIL: return fetchRecipeCategoriesFail(state, action);
        default: return state;
    }
}

export default reducer;