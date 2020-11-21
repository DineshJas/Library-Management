import { GET_BOOKS_LIST, GET_USERS_LIST } from "../actions/ActionTypes";

const initialState = {
    booksList: [],
    usersList: []
}

const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_BOOKS_LIST:
            return {
                ...state,
                booksList: [...action.payload]
            }

        case GET_USERS_LIST:
            return {
                ...state,
                usersList: [...action.payload]
            }

            default:
                return state
    }
}

export default UserReducer;
