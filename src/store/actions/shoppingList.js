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

export const fetchShoppingLists = (userId, token) => {
    return dispatch => {
        dispatch(fetchShoppingListsStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/shoppingList.json' + queryParams)
            .then(res => {
                const fetchedShoppingListsData = [];
                for (let key in res.data) {
                    fetchedShoppingListsData.push({
                        ...res.data[key],
                        id: key
                    });
                }

                const shoppingList = fetchedShoppingListsData[0];

                dispatch(fetchShoppingListsSuccess(shoppingList));
            }).catch(err => {
                dispatch(fetchShoppingListsFail(err));
            });
    };
};
