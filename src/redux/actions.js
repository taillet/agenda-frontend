const ROOT_URL = `http://localhost:3000/`

const fetchedToDoItems = (todoitems)=> ({ type: "FETCHED_TODOITEMS", todoitems})
const fetchedCategories = (categories)=> ({ type: "FETCHED_CATEGORIES", categories})
const loadingCategories = () => ({ type: "LOADING_CATEGORIES"})
const loadingToDoItems = () => ({ type: "LOADING_TODOITEMS"})
const loadingEvents = () => ({ type: "LOADING_EVENTS"})
const specificToDo = (todoitem) => ({type: "ADD_TODO", todoitem})
const specificNote = (note,id) => ({type: "EDIT_NOTE", note,id})
const fetchedNotes = (notes) => ({ type: "FETCHED_NOTES", notes})
const fetchedEvents = (events) => ({ type: "FETCHED_EVENTS", events})
const createFakeList = (todos,events,notes,hiddenEvents) => ({type: "FAKE_LIST", todos,events,notes,hiddenEvents})
const filteredFakeList = (fakeList, hiddenEvents) => ({type: "FILTER_FAKE_LIST", fakeList, hiddenEvents})
const loadingNotes = () => ({ type: "LOADING_NOTES"})

const addToHiddenEvents = (object) => ({ type: "ADD_TO_HIDDEN_EVENTS", object})

function creatingFakeList() {
  let todos = []
  let events = []
  let notes = []
  return (dispatch) => {
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items`)
    .then(res => res.json())
    .then(todoitems => {todos = todoitems})
    .then(
    fetch(ROOT_URL + `notes`)
    .then(res => res.json())
    .then(n => {notes = n}))
    .then(
    fetch(ROOT_URL + `events`)
    .then(res => res.json())
    .then(e => {events = e}))
    .then(()=>dispatch(createFakeList(todos,events,notes)))
  }
}

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

function fetchingEvents(){
  return (dispatch) => {
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `events`)
    .then(res => res.json())
    .then(events => {
      console.log("fetched events",events)
      dispatch(fetchedEvents(events))
    })
  }
}

function fetchingCategories(){
  return (dispatch) => {
    dispatch(loadingCategories())
    fetch(ROOT_URL + `categories`)
    .then(res => res.json())
    .then(categories => {
      console.log("fetched categories",categories)
      dispatch(fetchedCategories(categories))
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
        priority: "Low",
        description: description
      })
    })
    .then(res => res.json())
    .then(to_do_item => {
    //  dispatch(specificToDo(to_do_item))
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

function editingPriority(todoid, priority) {
  console.log("editing toooodoooo priority", priority)
  return (dispatch) => {
    console.log("in dispatch fetch")
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items/${todoid}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        priority: priority
      })
    })
    .then(res => res.json())
    .then(to_do_item => {
      console.log("fetched todos",to_do_item);
//      dispatch(specificToDo(to_do_item))
      dispatch(fetchingToDoItems())
    })
  }
}


function editingToDoCategories(todoid, categoryHashArray,date) {
  console.log("editing toooodoooo categories", categoryHashArray)
  return (dispatch) => {
    console.log("in dispatch fetch")
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `to_do_items/${todoid}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        categories: categoryHashArray,
        day: date
      })
    })
    .then(res => res.json())
    .then(to_do_item => {
      console.log("fetched todos",to_do_item);
      dispatch(fetchingToDoItems())
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

function deletingNote(noteid) {
  console.log("deleting note", noteid)
  return (dispatch) => {
    console.log("sup")
    dispatch(loadingNotes())
    fetch(ROOT_URL + `notes/${noteid}`, {
      method: 'DELETE',
      headers: {"Content-Type":"application/json", Accept:"application/json"}
    })
    .then(res => res.json())
    .then(note => {
      console.log("fetched note",note);
      dispatch(fetchingEvents())
    })
  }
}

function deletingEvent(eventid) {
  console.log("deleting note", eventid)
  return (dispatch) => {
    console.log("sup")
    dispatch(loadingNotes())
    fetch(ROOT_URL + `events/${eventid}`, {
      method: 'DELETE',
      headers: {"Content-Type":"application/json", Accept:"application/json"}
    })
    .then(res => res.json())
    .then(e => {
      console.log("fetched note",e);
      dispatch(creatingFakeList())
    })
  }
}

function deletingCategory(categoryid) {
  console.log("deleting note", categoryid)
  return (dispatch) => {
    console.log("sup")
    dispatch(loadingNotes())
    fetch(ROOT_URL + `categories/${categoryid}`, {
      method: 'DELETE',
      headers: {"Content-Type":"application/json", Accept:"application/json"}
    })
    .then(res => res.json())
    .then(e => {
      dispatch(fetchingCategories)
    })
  }
}


function editingNote(noteid, title, description, categoryHashArray){
  console.log("editing note", description, categoryHashArray)
  return (dispatch) => {
    console.log("in dispatch fetch")
    dispatch(loadingNotes())
    fetch(ROOT_URL + `notes/${noteid}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        title: title,
        description: description,
        categories: categoryHashArray
      })
    })
    .then(res => res.json())
    .then(note => {
      console.log("note todos",note);
      dispatch(specificNote(note,noteid))
      dispatch(fetchingNotes())
    })
  }
}

function editNoteDate(noteid, date){
  console.log("editing note date", date)
  return (dispatch) => {
    console.log("in dispatch fetch")
    dispatch(loadingNotes())
    fetch(ROOT_URL + `notes/${noteid}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        day: date
      })
    })
    .then(res => res.json())
    .then(note => {
      console.log("note todos",note);
      dispatch(fetchingNotes())
    })
  }
}




function editingCategoryColor(categoryid, color){
  console.log("editing color", color, "Categoryid", categoryid)
  return (dispatch) => {
    console.log("in dispatch fetch")
    dispatch(loadingNotes())
    fetch(ROOT_URL + `categories/${categoryid}`, {
      method: 'PATCH',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        color: color
      })
    })
    .then(res => res.json())
    .then(c => {
      console.log("note todos",c);
      dispatch(fetchingCategories())
    })
  }
}


function creatingNote(title,description, categoryHashArray) {
  console.log("creating note", title, description, "categories",categoryHashArray)
  return (dispatch) => {
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `notes`, {
      method: 'POST',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        user_id: 1,
        day: new Date,
        title: title,
        description: description,
        categories: categoryHashArray
      })
    })
    .then(res => res.json())
    .then(note => {
      console.log("NEW NOTE",note)
      dispatch(fetchingNotes())
    })
  }
}

function creatingEvent(start, end, title, description, priority, categoryHashArray) {
  console.log("creating event", start,end, title, description, "categories",categoryHashArray)
  return (dispatch) => {
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `events`, {
      method: 'POST',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        user_id: 1,
        start: start,
        end: end,
        title: title,
        description: description,
        priority: priority,
        categories: categoryHashArray
      })
    })
    .then(res => res.json())
    .then(() => {
      dispatch(creatingFakeList())
    })
  }
}


function creatingCategory(name) {
  console.log("creating category", name)
  return (dispatch) => {
    dispatch(loadingToDoItems())
    fetch(ROOT_URL + `categories`, {
      method: 'POST',
      headers: {"Content-Type":"application/json", Accept:"application/json"},
      body: JSON.stringify({
        name: name
      })
    })
    .then(res => res.json())
    .then(() => {
      dispatch(fetchingCategories())
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

export { deletingCategory, editingCategoryColor, creatingCategory, deletingEvent, addToHiddenEvents, creatingFakeList, creatingEvent, fetchingEvents, editNoteDate, fetchingNotes, fetchingCategories, fetchingToDoItems, todoActions, addingTodo, togglingTodo, deletingTodo, clearingTodos, editingTodo, editingPriority, editingNote, creatingNote, deletingNote, editingToDoCategories };
