import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers'
import thunk from 'redux-thunk';

export const middlewares = [thunk];
const initialState = {};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

