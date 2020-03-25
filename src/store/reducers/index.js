import userReducer from './user';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    userReducer,
})

export default reducers;