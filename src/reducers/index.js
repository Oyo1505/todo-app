import { combineReducers } from 'redux';
import visibilityFilter from "./visibilityFilter/reducer";
import todos from './todos/reducer';


export default combineReducers({ todos, visibilityFilter });