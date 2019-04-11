import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const CalendarComponent = props => (
  <div>
    <BigCalendar
    style={{height:'100vh'}}
      localizer={localizer}
      events={[{}]}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

export default CalendarComponent
