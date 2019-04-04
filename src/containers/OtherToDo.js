import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'

class OtherToDo extends React.Component {
  render() {
    return (
      <div className="grid-container">
      Hi I'm the todo container
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

export default connect(mapStateToProps,mapDispatchToProps)(OtherToDo)
