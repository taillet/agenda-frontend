import React from 'react'
import { Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import CalendarFilter from '../components/CalendarFilter'
import CalendarComponent from '../components/CalendarComponent'
import { deletingEvent, creatingFakeList, fetchingNotes, fetchingEvents } from '../redux/actions'

class CalendarContainer extends React.Component {
  constructor() {
    super()
    this.state = {filter: 'none', colorFilter: 'type'}
  }

  componentDidMount() {
    this.props.creatingFakeList()
  }

  refresh = () => {
    console.log(" hits refreshh calendar")
    this.props.creatingFakeList()
  }

  changeFilter = (filter) => {
    console.log("filterr", filter)
    if (filter.value === 'events') {
      this.setState({filter: 'events'})
    } else if (filter.value === 'notes') {
      this.setState({filter: 'notes'})

    } else if (filter.value === 'todos') {
      this.setState({filter: 'todos'})
    }
    else if (filter.value === 'none') {
      this.setState({filter: 'none'})
    } else {
      this.setState({filter: filter.value})
    }
  }
  changeColorFilter = (filter) => {
    this.setState({colorFilter: filter.value})
  }

  render() {
    let events = []

    if (this.state.filter === 'events') {
      events = this.props.everything.filter(event=> event.type === 'event')
    } else if (this.state.filter === 'notes') {
      events = this.props.everything.filter(event=> event.type === 'note')
    } else if (this.state.filter === 'todos') {
      events = this.props.everything.filter(event=> event.type === 'todo')
    }
    else if (this.state.filter === 'none') {
      events = this.props.everything
    } else {
      events = this.props.everything.filter(event=> event.resource.categories.map(category=>category.name).includes(this.state.filter))
    }

    console.log("everything props", this.props.everything)
    return (
      <>
      <Segment basic floated="left" style={{width: '14vw', marginTop: "1vh", paddingTop: '0px'}}>
      <CalendarFilter changeFilter={this.changeFilter} changeColorFilter={this.changeColorFilter} />
      </Segment>
      <div className="ui container" style={{height: '80vh', marginTop: '1.5vh'}}>
      <CalendarComponent events={events} filter={this.state.colorFilter} refresh={this.refresh} deletingEvent={this.props.deletingEvent}/>
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
    everything: state.everything
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
