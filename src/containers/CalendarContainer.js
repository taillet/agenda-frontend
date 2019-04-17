import React from 'react'
import { Container } from 'semantic-ui-react'
import {connect} from 'react-redux'
import CalendarFilter from '../components/CalendarFilter'
import CalendarComponent from '../components/CalendarComponent'
import { fetchingCategories, deletingEvent, creatingFakeList, fetchingNotes, fetchingEvents } from '../redux/actions'
import moment from 'moment'

class CalendarContainer extends React.Component {

  componentDidMount() {
    this.props.fetchingNotes()
    this.props.fetchingEvents()
    this.props.fetchingCategories()
    this.props.creatingFakeList()
  }

  refresh = () => {
    this.props.creatingFakeList()
  }

  render() {
    let notes = this.props.everything
    console.log("everything props", this.props.everything)
    return (
      <>
      <Container style={{ marginTop: '1vh'}} textAlign='left'>
      <CalendarFilter categories={this.props.categories}/>
      </Container>
      <div className="ui container" style={{height: '80vh', marginTop: '1vh'}}>
      <CalendarComponent notes={notes} refresh={this.refresh} deletingEvent={this.props.deletingEvent}/>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    todos: state.todos,
    events: state.events,
    everything: state.everything,
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    fetchingNotes: ()=>{dispatch(fetchingNotes())},
    fetchingEvents: ()=>{dispatch(fetchingEvents())},
    fetchingCategories: ()=>{dispatch(fetchingCategories())},
    creatingFakeList: ()=>{dispatch(creatingFakeList())},
    deletingEvent: (obj)=>{dispatch(deletingEvent(obj))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarContainer)
