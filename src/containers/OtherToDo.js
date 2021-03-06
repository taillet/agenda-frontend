import ToDoContainer from './ToDoContainer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import { todoActions } from '../redux/actions'

class OtherToDo extends React.Component {
  render() {
    return (
      <div className="column">
      < ToDoContainer todos={this.props.todos}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //props: state.something
    todos: state.todos
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    todosActions: bindActionCreators(todoActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OtherToDo)
