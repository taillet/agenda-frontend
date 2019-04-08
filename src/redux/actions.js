const ROOT_URL = `http://localhost:3000/`

const fetchedToDoItems = (todoitems)=> ({ type: "FETCHED_TODOITEMS", todoitems})
const loadingToDoItems = () => ({ type: "LOADING_TODOITEMS"})
const specificToDo = (todoitem) => ({type: "TODO", todoitem})
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
      dispatch(specificToDo(to_do_item))
      dispatch(fetchingToDoItems())
    })
  }
}

function togglingTodo(todoid, listid, isChecked) {
  console.log("toggling toooodoooo", isChecked)
  return (dispatch) => {
    console.log("sup")
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items/${todoid}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        checked: !isChecked
      })
    })
    .then(res => res.json())
    .then(to_do_item => {
      console.log("fetched todos",to_do_item);
      dispatch(todoActions.toggleTodo(listid))
    })
  }
}


function editingTodo(todoid, listid, description) {
  console.log("editing toooodoooo", description)
  return (dispatch) => {
    console.log("in dispatch fetch")
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items/${todoid}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        description: description
      })
    })
    .then(res => res.json())
    .then(to_do_item => {
      console.log("fetched todos",to_do_item);
      dispatch(todoActions.editTodo(listid, description))
    })
  }
}

function deletingTodo(todoid, listid) {
  console.log("deleting toooodoooo", todoid)
  return (dispatch) => {
    console.log("sup")
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items/${todoid}`, {
      method: 'DELETE',
      headers: {"Content-Type":"application/json", Accept:"application/json"}
    })
    .then(res => res.json())
    .then(to_do_item => {
      console.log("fetched todos",to_do_item);
      dispatch(todoActions.removeTodo(listid))
    })
  }
}

function clearingTodos() {
  console.log("clearing toooodoooos")
  return (dispatch) => {
    console.log("sup")
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items/delete_all`, {
      method: 'POST',
      headers: {"Content-Type":"application/json", Accept:"application/json"}
    })
    .then(()=>dispatch(todoActions.clearTodos())
    )
  }
}



const todoActions = {
  addTodo(description='') {
    return {
      type: 'ADD_TODO'
        }
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

export { fetchingNotes, fetchingToDoItems, todoActions, addingTodo, togglingTodo, deletingTodo, clearingTodos, editingTodo };