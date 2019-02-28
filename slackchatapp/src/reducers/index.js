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
        
        case actionTypes.Clear_User:
            return{
               ...state  ,
               isLoading: false
            }
        default:
            return state;
    }
}

const initialChannelState = {
    currentChannel : null
}

const channel_reducer = (state = initialChannelState,action) =>{

    switch(action.type){
        case actionTypes.Set_Current_Channel:
        return {
            ...state,
            currentChannel: action.payload.currentChannel
        }
        default:
            return state;
    }

}

const rootReducers = combineReducers({
    user: user_reducers,
    channel: channel_reducer
});

export default rootReducers;  

