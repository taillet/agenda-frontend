import { combineReducers } from "redux";

const todoReducer = (state = [""], action) => {
  switch(action.type) {
    case "FETCHED_TODOITEMS":
    return action.todoitems
        // Push a new todo with the action description
        // and a checked value of false
    case 'ADD_TODO':
    console.log("add to do", action)
      return [
          ...state,
          {
            description: action.description,
            checked: action.checked,
            todoid: action.id,
            priority: action.priority,
            tags: action.categories
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
    case 'EDIT_NOTE':
      return state.map((note, id) => {
        if(id === action.id) {
          return {
            ...note,
            description: action.note.description,
            title: action.note.title
          }
        } else {
          return note
        }
      })
    default:
  return state;
  }
}

const categoryReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_CATEGORIES":
    return action.categories
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

const everything = (state = [],action) => {
  switch(action.type) {
  case "FAKE_LIST":
  console.log("hits fake list reducer")
  let fakeList = []
  action.notes && action.notes.forEach(note => fakeList.push({title: note.title, allDay: true, start: new Date(note.day.date), end: new Date(note.day.date), resource: note, type: 'note'}))
  action.todos && action.todos.forEach(todos => (todos.checked !== true) && fakeList.push({title: todos.description,  allDay: true, start: todos.day ? new Date(todos.day.date) : new Date(), type: 'todo', resource: todos, end: todos.day ? new Date(todos.day.date) : new Date()}))
  action.events && action.events.forEach(events => fakeList.push({title: events.title, allDay: false, start: events.start ? new Date(events.start.date) : new Date(), type: 'event', resource: events, end: events.end ? new Date(events.end.date) : new Date()}))
  return fakeList
  default:
  return state;
}
}

const hiddenEvents = (state = [],action) => {
  switch(action.type) {
  case "ADD_TO_HIDDEN_EVENTS":
  console.log("do i hit add to hidden events", action.object)
  return [...state, action.object]
  default:
  return state;
}
}

const rootReducer = combineReducers({
  // state: reducer
  // searchText: searchTextReducer,
   todos: todoReducer,
   notes: noteReducer,
   events: eventReducer,
   categories: categoryReducer,
   everything: everything,
   hiddenEvents: hiddenEvents
  // loading: loadingReducer
});

export default rootReducer;
