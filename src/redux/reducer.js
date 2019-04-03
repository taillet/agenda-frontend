import { combineReducers } from "redux";

const todoReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_TODOITEMS":
    return action.todoitems
    default:
  return state;
  }
}

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_NOTES":
    return action.notes
    default:
  return state;
  }
}

const rootReducer = combineReducers({
  // state: reducer
  // searchText: searchTextReducer,
   todos: todoReducer,
   notes: noteReducer
  // loading: loadingReducer
});

export default rootReducer;
