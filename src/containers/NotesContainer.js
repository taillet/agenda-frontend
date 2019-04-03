import React from 'react'
import {connect} from 'react-redux'

class NotesContainer extends React.Component {
  render() {
    return (
      <div className="grid-container">
      Hi I'm the notes container
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

export default connect(mapStateToProps,mapDispatchToProps)(NotesContainer)
