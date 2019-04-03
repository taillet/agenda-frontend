import React from 'react'
import {connect} from 'react-redux'
import AccordianToDo from '../components/AccordianToDo'

class Dashboard extends React.Component {
  render() {
    return (
      <div className="grid-container">
      < AccordianToDo />
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

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
