import ToDoContainer from './ToDoContainer'
import { createStore, combineReducers, applyMiddleware, compose, bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import React from 'react'
import { Motion, spring } from 'react-motion'
import { render } from 'react-dom'
import { todoActions } from '../redux/actions'

class Dashboard extends React.Component {
  render() {
    return (
      <div className="grid-container">
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

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
