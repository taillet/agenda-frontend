import React from 'react'
import {connect} from 'react-redux'
import CalendarComponent from '../components/CalendarComponent'
import { deletingEvent, creatingFakeList, fetchingNotes, fetchingEvents } from '../redux/actions'
import moment from 'moment'

class CalendarContainer extends React.Component {

  componentDidMount() {
    this.props.fetchingNotes()
    this.props.fetchingEvents()
    this.props.creatingFakeList()
  }

  refresh = () => {
    this.props.creatingFakeList()
  }

  render() {
    console.log("what are hidden objects",this.props.hiddenEvents)
    let notes = this.props.everything.filter(e=>!this.props.hiddenEvents.includes(e))
    console.log("everything props", this.props.everything)
    return (
      <div className="ui container" style={{height: '80vh', marginTop: '3vh'}}>
      <CalendarComponent notes={notes} refresh={this.refresh} deletingEvent={this.props.deletingEvent}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    todos: state.todos,
    events: state.events,
    everything: state.everything,
    hiddenEvents: state.hiddenEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    fetchingNotes: ()=>{dispatch(fetchingNotes())},
    fetchingEvents: ()=>{dispatch(fetchingEvents())},
    creatingFakeList: ()=>{dispatch(creatingFakeList())},
    deletingEvent: (obj)=>{dispatch(deletingEvent(obj))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarContainer)
