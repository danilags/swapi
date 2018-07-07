// import all reducers and group under combineReducers
import { combineReducers } from 'redux';

import charReducer from './charReducer';

const rootReducer = combineReducers({
	charReducer,
});

export default rootReducer;
