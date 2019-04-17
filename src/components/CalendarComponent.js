import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
import { Button, Modal, Popup } from 'semantic-ui-react'


const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = '#' + event.hexColor;
  var style = {
    backgroundColor: 'black',
    borderRadius: '0px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block'
  };
  return {
    style: style
  };
}

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
class CalendarComponent extends React.Component {
  constructor() {
    super()
    this.state = {open: false, current: {}, hiddenEvents: []}
  }

  openModal = (o) => {
    this.setState({open: true, current: o})
  }
  close = () => {
    this.setState({open: false, current: {}})
  }

  onHide = (e) => {
    this.setState({hiddenEvents: [...this.state.hiddenEvents, e]})
    // call add to hidden events
  }

  unHideAll = () => {
    this.setState({hiddenEvents: []})
  }

  handleClick = (obj) => {
    this.props.deletingEvent(obj.resource.id)
    this.props.refresh()
  }

  render() {

    let visibleEvents = this.props.notes.filter(note=>!this.state.hiddenEvents.includes(note))

    return(
      <div>
      <BigCalendar
      style={{height:'85vh'}}
      localizer={localizer}
      popup
      showMultiDayTimes
      events={visibleEvents}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={e=>this.openModal(e)}

      eventPropGetter={
        (event, start, end, isSelected) => {
          let newStyle = {
            backgroundColor: "lightgrey",
            color: 'black',
            borderRadius: "0px",
            border: "none"
          };
          if (event.type === 'note'){
            newStyle.backgroundColor = "lightgreen"
          } else if (event.type === 'todo') {
            newStyle.backgroundColor = "orange"
          } else if (event.type === 'event') {
            newStyle.backgroundColor = "lightblue"
          }
          return {
            className: "",
            style: newStyle
          };
        }
      }
      />
      <Modal open={this.state.open}  size="tiny" onClose={this.close} style={{width:'30vw'}}>
      <Modal.Header style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>Delete Note</Modal.Header>
      <Modal.Content style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <p>{this.state.current.title}</p>
      </Modal.Content>
      <Modal.Actions style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      <Button content="Hide" onClick={()=>this.onHide(this.state.current)}/>
      {this.state.current.type === 'event' ?
      <Button content="Delete" onClick={()=>this.handleClick(this.state.current)}/> : null}
      </Modal.Actions>
      </Modal>
      </div>
    )}
  }

  export default CalendarComponent
