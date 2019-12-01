import * as types from './../../actions/types';
import initialState from '../initialState';


export default function todosReducer(state = initialState, action) {

 switch (action.type) {
    case types.ADD_TODO_SUCCESS: {
     const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case types.UPDATE_TODO_SUCCESS: {
     const { id, content } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: state.byIds[id].completed
          }
        }
      };
    }
     case types.TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    case types.DELETE_TODO_SUCCESS:{
        const { id, content } = action.payload;
        const newState = Object.assign({}, state);
        const indexOfUserToDelete = state.allIds.findIndex(user => { 
          return user._id === action.payload._id
        })
        newState.allIds.splice(indexOfUserToDelete, 1);
        delete newState.byIds[id]
         return newState;
       }
    default:
      return state;
  }
}

