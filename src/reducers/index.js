// import all reducers and group under combineReducers
import { combineReducers } from 'redux';

import heroReducer from './heroReducer';

const rootReducer = combineReducers({
	heroReducer,
});

export default rootReducer;
