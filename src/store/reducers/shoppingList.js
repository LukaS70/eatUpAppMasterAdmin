import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    shoppingLists: null,
    loading: false,
};

const fetchShoppingListsStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchShoppingListsSuccess = (state, action) => {
    return updateObject(state, {
        shoppingLists: action.shoppingLists,
        loading: false,
    });
};

const fetchShoppingListsFail = (state, action) => {
    return updateObject(state, { loading: false });
};

//--------------------------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHOPPING_LISTS_START: return fetchShoppingListsStart(state, action);
        case actionTypes.FETCH_SHOPPING_LISTS_SUCCESS: return fetchShoppingListsSuccess(state, action);
        case actionTypes.FETCH_SHOPPING_LISTS_FAIL: return fetchShoppingListsFail(state, action);
        default: return state;
    }
}

export default reducer;