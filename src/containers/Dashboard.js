import ToDoContainer from './ToDoContainer'
import { createStore, combineReducers, applyMiddleware, compose, bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import React from 'react'
import { Motion, spring } from 'react-motion'
import { render } from 'react-dom'
import { todoActions } from '../redux/actions'
import DatePicker from "react-datepicker";
import CreateEvent from '../components/CreateEvent'


class Dashboard extends React.Component {

  render() {

    return (
      <div className="ui container">
      <CreateEvent />
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
