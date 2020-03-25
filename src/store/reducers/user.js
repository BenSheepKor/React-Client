import {STORE_TOKEN, CLEAR_TOKEN} from '../../constants';

const userState = {
    token: null,
}

function userReducer(state = userState, action){
    switch(action.type){
        case STORE_TOKEN:
            return {...state , token: action.payload};
        case CLEAR_TOKEN:
            return {...state, token: null};
        default:
            return state;
    }
}

export default userReducer;