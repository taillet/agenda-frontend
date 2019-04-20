import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import marked from 'marked'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
import { Button, Modal, Divider } from 'semantic-ui-react'


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

   getMarkdown = (form_input) => {
      if (form_input) {
        let markdown = marked(form_input , { sanitize: true })
        return { __html: markdown }
      }
    }

  render() {

    let visibleEvents = this.props.events.filter(note=>!this.state.hiddenEvents.includes(note))

    return(
      <div>
      <BigCalendar
      style={{height:'88vh'}}
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
            borderRadius: "px",
            borderTop: "1px solid rgb(212,212,213)",
            borderBottom: "1px solid rgb(212,212,213)"
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
              newStyle.backgroundColor = '#FF9999'
            } else if (event.resource.priority === 'Low') {
              newStyle.backgroundColor = '#ffff99'
            } else if (event.resource.priority === 'Medium') {
              newStyle.backgroundColor = '#ffc966'
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
      <Modal open={this.state.open}  size="tiny" onClose={this.close} style={{width:'25vw'}}>
      <Modal.Header as="H4" style={{margin:'0px', fontFamily: 'Montserrat', textAlign: 'center', textTransform: 'uppercase', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      {this.state.current.type === 'todo' && moment(this.state.current.resource.day.date).format('MMMM D, YYYY')}
      {this.state.current.type === 'note' && moment(this.state.current.resource.day.date).format('MMMM D, YYYY')}
      {(this.state.current.type === 'event' && moment(this.state.current.resource.start.date).format('MMMM D') !== moment(this.state.current.resource.end.date).format('MMMM D'))
        && moment(this.state.current.resource.start.date).format('MMMM D') + " - " + moment(this.state.current.resource.end.date).format('MMMM D')}
      {(this.state.current.type === 'event' && moment(this.state.current.resource.start.date).format('MMMM D') === moment(this.state.current.resource.end.date).format('MMMM D'))
      && moment(this.state.current.resource.start.date).format('MMMM D')}
      </Modal.Header>
      <Modal.Content style={{paddingTop: '1vh', paddingBottom: '1vh', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      {this.state.current.type === 'todo' && "Deadline: " +  moment(this.state.current.resource.day.date).format('dddd, h:mm a')}

      {(this.state.current.type === 'event' && moment(this.state.current.resource.start.date).format('MMMM D') === moment(this.state.current.resource.end.date).format('MMMM D'))
        && moment(this.state.current.resource.start.date).format('h:mm a') + " - " + moment(this.state.current.resource.end.date).format('h:mm a')}
      {(this.state.current.type === 'event' && moment(this.state.current.resource.start.date).format('MMMM D') !== moment(this.state.current.resource.end.date).format('MMMM D'))
      && moment(this.state.current.resource.start.date).format('ddd, h:mm a') + " - " + moment(this.state.current.resource.end.date).format('ddd, h:mm a')}

      {this.state.current.type === 'note' && "Date: " + moment(this.state.current.resource.day.date).format('dddd, h:mm a')}
      </Modal.Content>
      <Divider section style={{margin:'0px'}}/>
      <Modal.Content style={{paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center', alignContent: 'center', overflow: 'auto'}}>
      {this.state.current.type === 'note' &&
      <div dangerouslySetInnerHTML={this.getMarkdown(this.state.current.resource.description)} />}
      {this.state.current.type === 'todo' && this.state.current.title}
      {this.state.current.type === 'event' && this.state.current.resource.description}
      </Modal.Content>
      <Modal.Actions style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      {this.state.current.type === 'event' ?
      <Button content="Hide"  style={{ fontFamily: 'Montserrat', textTransform: 'uppercase'}} labelPosition='left' onClick={()=>{this.onHide(this.state.current);  this.close()}}/> : <Button content="Hide from Calendar"  style={{ fontFamily: 'Montserrat', textTransform: 'uppercase'}} labelPosition='left' onClick={()=>this.onHide(this.state.current)}/>}
        {this.state.current.type === 'event' ?
      <Button content="Delete" style={{ fontFamily: 'Montserrat', textTransform: 'uppercase'}} labelPosition='right' onClick={()=>{this.handleClick(this.state.current); this.close()}}/> : null}
      </Modal.Actions>
      </Modal>


      </div>
    )}
  }

  export default CalendarComponent
