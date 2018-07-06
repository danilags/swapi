//		1. thunk 	= for async request
//		2. logger = for logging prev state, action & next state
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'
import { logger } from 'redux-logger'

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}
const createStoreWithMiddleware = compose(
    applyMiddleware(...middlewares),
  )(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
