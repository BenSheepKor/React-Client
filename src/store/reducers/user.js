import {STORE_TOKEN, CLEAR_TOKEN} from '../../constants';

const userState = {
    token: null,
}

function userReducer(state = userState, action){
    switch(action.type){
        case STORE_TOKEN:
            return Object.assign({}, state, {token: action.payload});
        case CLEAR_TOKEN:
            return Object.assign({}, state , {token: null});
    }

    return state;
}

export default userReducer;