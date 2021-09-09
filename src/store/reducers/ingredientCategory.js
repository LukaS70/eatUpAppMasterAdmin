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

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENT_CATEGORIES_START: return fetchIngredientCategoriesStart(state, action);
        case actionTypes.FETCH_INGREDIENT_CATEGORIES_SUCCESS: return fetchIngredientCategoriesSuccess(state, action);
        case actionTypes.FETCH_INGREDIENT_CATEGORIES_FAIL: return fetchIngredientCategoriesFail(state, action);
        default: return state;
    }
}

export default reducer;