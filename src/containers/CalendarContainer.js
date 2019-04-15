import React from 'react'
import {connect} from 'react-redux'
import CalendarComponent from '../components/CalendarComponent'
import { fetchingNotes, fetchingEvents } from '../redux/actions'
import moment from 'moment'

class CalendarContainer extends React.Component {

  componentDidMount() {
    this.props.fetchingNotes()
    this.props.fetchingEvents()
  }

  render() {
  let notes = []
  this.props.notes && this.props.notes.forEach(note => notes.push({title: note.title, allDay: true, start: new Date(note.day.date), end: new Date(note.day.date), resource: note, type: 'note'}))
  this.props.todos && this.props.todos.forEach(todos => notes.push({title: todos.description,  allDay: true, start: todos.day ? new Date(todos.day.date) : new Date, type: 'todo', resource: todos, end: todos.day ? new Date(todos.day.date) : new Date}))
  this.props.events && this.props.events.forEach(events => notes.push({title: events.title, allDay: false, start: events.start ? new Date(events.start.date) : new Date, type: 'event', resource: events, end: events.end ? new Date(events.end.date) : new Date}))

    return (
      <div className="ui container" style={{height: '400vh', marginTop: '5vh'}}>
      <CalendarComponent notes={notes}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    todos: state.todos,
    events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    fetchingNotes: ()=>{dispatch(fetchingNotes())},
    fetchingEvents: ()=>{dispatch(fetchingEvents())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarContainer)
