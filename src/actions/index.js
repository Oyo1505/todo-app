import * as types from './types';

let nextTodoId = 0;


export const addTodo = content => ({
	type: types.ADD_TODO_SUCCESS,
 	 payload: {
    	id: ++nextTodoId,
  		content
  }
});
export const toggleTodo = id => ({
  type: types.TOGGLE_TODO,
  payload: { id }
});

export const deleteTodo = content => ({
	type: types.DELETE_TODO_SUCCESS, payload: {
    id: content.id,
    content
  }
});

export const setFilter = filter => ({ type: types.SET_FILTER, payload: { filter } });