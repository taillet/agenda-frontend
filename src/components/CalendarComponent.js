import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
import { Button, Modal } from 'semantic-ui-react'


// const eventStyleGetter = (event, start, end, isSelected) => {
//   var backgroundColor = '#' + event.hexColor;
//   var style = {
//     backgroundColor: 'black',
//     borderRadius: '0px',
//     opacity: 0.8,
//     color: 'black',
//     border: '0px',
//     display: 'block'
//   };
//   return {
//     style: style
//   };
// }

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
class CalendarComponent extends React.Component {
  constructor(props) {
    super(props)
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

    let visibleEvents = this.props.events.filter(note=>!this.state.hiddenEvents.includes(note))

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
            backgroundColor: 'rgb(224,255,255)',
            color: 'black',
            borderRadius: "0px",
            borderTop: "1px solid",
            borderBottom: "1px solid"
          };
          if (this.props.filter === 'type') {
            console.log("type")
          if (event.type === 'note'){
            newStyle.backgroundColor = 'rgb(224,255,255)'
          } else if (event.type === 'todo') {
            newStyle.backgroundColor = "teal"
            newStyle.color = "white"
          } else if (event.type === 'event') {
            newStyle.backgroundColor = "lightblue"
          }} else if (this.props.filter === 'priority') {
            if (event.resource.priority === null){
              newStyle.backgroundColor = 'rgb(224,255,255)'
            } else if (event.resource.priority === 'High') {
              newStyle.backgroundColor = "red"
              newStyle.color = "white"

            } else if (event.resource.priority === 'Low') {
              newStyle.backgroundColor = "yellow"
            } else if (event.resource.priority === 'Medium') {
              newStyle.backgroundColor = "orange"
            }
          } else if (this.props.filter === 'category') {
            console.log(event)
            if (event.resource.categories.length === 0 ) {
              console.log("hello");
              newStyle.backgroundColor = 'rgb(224,255,255)'
            } else {
              console.log("event res cat", event.resource.categories)
              newStyle.backgroundColor = event.resource.categories[0].color
            }
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
