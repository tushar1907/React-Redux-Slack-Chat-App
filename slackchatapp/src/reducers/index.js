import * as actionTypes from '../action/types';

import {combineReducers} from 'redux'

const intialUserState = {
    currentUser: null,
    isLoading: true
}

const user_reducers = (state = intialUserState,action)=>{
    switch(action.type){
        case actionTypes.Set_User:
            return{
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        default:
            return state;
    }
}


const rootReducers = combineReducers({
    user: user_reducers
});

export default rootReducers;  

