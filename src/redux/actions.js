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
      //{type: "FETCHED_PAINTINGS", paintings}
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
      //{type: "FETCHED_PAINTINGS", paintings}
    })
  }
}

export { fetchingNotes, fetchingToDoItems };
