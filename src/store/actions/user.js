import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    };
};

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    };
};

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsers = (token) => {
    return dispatch => {
        dispatch(fetchUsersStart());
        axios.get('/users', {headers: { 'Authorization': 'Bearer ' + token}})
            .then(res => {
                console.log(res);
                const users = res.data.users;
                dispatch(fetchUsersSuccess(users));
            }).catch(err => {
                dispatch(fetchUsersFail(err));
            });
    };
};