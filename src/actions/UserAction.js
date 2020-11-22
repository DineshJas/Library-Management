import axios from "axios";
import api from '../utils/apis.json';
import {
    GET_BOOKS_LIST,
    GET_USERS_LIST
} from './ActionTypes';

export const getBookListApi = () => dispatch => {
    axios.get(api.getBooksList)
    .then((res) => {
        dispatch({
            type: GET_BOOKS_LIST,
            payload: res.data.response
        })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const addNewBookApi = (data, callBack) => dispatch => {
    axios.post(api.addBookDetails, data)
    .then((res) => {
        console.log(res.data)
        // dispatch({})
        callBack(res.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const deleteBookApi = (data, callBack) => dispatch => {
    axios.delete(api.deleteBook+`?bookId=${data}`)
    .then((res) => {
        console.log(res.data)
        // dispatch({})
        callBack(res.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const editBookApi = (data, callBack) => dispatch => {
    axios.put(api.editBook, data)
    .then((res) => {
        console.log(res.data)
        // dispatch({})
        callBack(res.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const editUserStatusApi = (data, callBack) => dispatch => {
    axios.delete(api.editUserStatus+`?userId=${data}`)
    .then((res) => {
        console.log(res.data)
        // dispatch({})
        callBack(res.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const getUsersListApi = () => dispatch => {
    axios.get(api.getUsersList)
    .then((res) => {
        dispatch({
            type: GET_USERS_LIST,
            payload: res.data.response
        })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const getActiveUsersListApi = (callBack) => dispatch => {
    axios.get(api.getActiveUsersList)
    .then((res) => {
        console.log(res.data)
        // dispatch({})
        callBack(res.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export const lendBookApi = (data, callBack) => dispatch => {
    axios.put(api.lendBookToUser, data)
    .then((res) => {
        console.log(res.data)
        // dispatch({})
        callBack(res.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}