import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchShoppingListsSuccess = (shoppingLists) => {
    return {
        type: actionTypes.FETCH_SHOPPING_LISTS_SUCCESS,
        shoppingLists: shoppingLists
    };
};

export const fetchShoppingListsFail = (error) => {
    return {
        type: actionTypes.FETCH_SHOPPING_LISTS_FAIL,
        error: error
    };
};

export const fetchShoppingListsStart = () => {
    return {
        type: actionTypes.FETCH_SHOPPING_LISTS_START
    };
};

export const fetchShoppingLists = (token) => {
    return dispatch => {
        dispatch(fetchShoppingListsStart());
        axios.get('/shopping-list', {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                dispatch(fetchShoppingListsSuccess(res.data.shoppingLists));
            }).catch(err => {
                dispatch(fetchShoppingListsFail(err));
            });
    };
};
