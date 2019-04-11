import React from 'react'
import {connect} from 'react-redux'
import CalendarComponent from '../components/CalendarComponent'

class CalendarContainer extends React.Component {
  render() {
    return (
      <div className="ui container" style={{height: '400vh', marginTop: '5vh'}}>
      <CalendarComponent />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //props: state.something
  }
}

const mapDispatchToProps = () => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarContainer)
