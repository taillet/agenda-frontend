import { combineReducers } from "redux";

const todoReducer = (state = [""], action) => {
  switch(action.type) {
    case "FETCHED_TODOITEMS":
    return action.todoitems
        // Push a new todo with the action description
        // and a checked value of false
    case 'ADD_TODO':
      return [
          ...state,
          {
            description: action.description,
            checked: false
          }
        ]

    // Mutate the todo that matches the action id
    // and toggle it's existing value to the opposite
    case 'TOGGLE_TODO':
      return state.map((todo, id) => {
        if (id === action.id) {
          return {
            ...todo,
            checked: !todo.checked
          }
        } else {
          return todo
        }
      })

      // Mutate the todo that matches the action id
      // and change its description to the action description
      case 'EDIT_TODO':
        return state.map((todo, id) => {
          if(id === action.id) {
            return {
              ...todo,
              description: action.description
            }
          } else {
            return todo
          }
        })

    // Filters out the todo that matches the action id
    case 'REMOVE_TODO':
      return state.filter((todo, id) => {
        return id !== action.id
      })

    // Filters out checked todos
    case 'CLEAR_TODOS':
      return state.filter((todo) => {
        return !todo.checked
      })
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

const eventReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_EVENTS":
    return action.events
    default:
  return state;
  }
}

const rootReducer = combineReducers({
  // state: reducer
  // searchText: searchTextReducer,
   todos: todoReducer,
   notes: noteReducer,
   events: eventReducer
  // loading: loadingReducer
});

export default rootReducer;
