const ROOT_URL = `http://localhost:3000/`

const fetchedToDoItems = (todoitems)=> ({ type: "FETCHED_TODOITEMS", todoitems})
const loadingToDoItems = () => ({ type: "LOADING_TODOITEMS"})
const fetchedNotes = (notes) => ({ type: "FETCHED_NOTES", notes})
const loadingNotes = () => ({ type: "LOADING_NOTES"})

function fetchingToDoItems(){
  return (dispatch) => {
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items`)
    .then(res => res.json())
    .then(todoitems => {
      console.log("fetched to do items",todoitems)
      dispatch(fetchedToDoItems(todoitems))
    })
  }
}

function fetchingNotes(){
  return (dispatch) => {
    dispatch(loadingNotes())
    fetch(ROOT_URL + `notes`)
    .then(res => res.json())
    .then(notes => {
      console.log("fetched notes",notes)
      dispatch(fetchedNotes(notes))
    })
  }
}

function addingTodo(description) {
  console.log("addinnnnngngg toooodoooo", description)
  return (dispatch) => {
    console.log("sup")
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items`, {
      method: 'POST',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        user_id: 1,
        day_id: 1,
        checked: false,
        priority: "medium",
        description: description,
        category_id: 1
      })
    })
    .then(res => res.json())
    .then(to_do_item => {
      console.log("fetched todos",to_do_item);
      dispatch(todoActions.addTodo())
    })
  }
}


const todoActions = {
  addTodo(description='') {
    return {
      type: 'ADD_TODO'    }
  },
  toggleTodo(id) {
    return {
      type: 'TOGGLE_TODO',
      id
    }
  },
  editTodo(id, description) {
    return {
      type: 'EDIT_TODO',
      id,
      description
    }
  },
  removeTodo(id) {
    return {
      type: 'REMOVE_TODO',
      id
    }
  },
  clearTodos() {
    return {
      type: 'CLEAR_TODOS'
    }
  },
  countTodos() {
    return {
      type: 'COUNT_TODOS'
    }
  }
}

export { fetchingNotes, fetchingToDoItems , todoActions, addingTodo};
