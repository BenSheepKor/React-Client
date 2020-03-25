import {STORE_TOKEN, CLEAR_TOKEN} from '../../constants';

export function storeToken(payload){
    return {
        type: STORE_TOKEN,
        payload
    }
};

export function clearToken(payload) {
    return {
        type: CLEAR_TOKEN,
        payload,
    }
};

