import * as actionTypes from './types';

export const setUser = user =>{
    return {
        type: actionTypes.Set_User,
        payload: {
            currentUser: user
        }
    }
}