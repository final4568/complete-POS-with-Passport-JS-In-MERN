import { combineReducers } from 'redux';
import ThemeOptions from './ThemeOptions';
import authReducer from './authReducer';
import tokenreducer from './tokenreducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    ThemeOptions, authReducer, tokenreducer, userReducer
})
export default rootReducer;