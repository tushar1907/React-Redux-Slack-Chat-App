import * as actionTypes from './types';

export const setUser = user =>{
    return {
        type: actionTypes.Set_User,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () =>{
    return {
        type: actionTypes.Clear_User
    }
}

//Channel actions
export const setCurrrentChannel = (channel) =>{
    return {
        type: actionTypes.Set_Current_Channel,
        payload: {
            currentChannel: channel
        }
    }
}