import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Dashboard from './containers/Dashboard'
import OtherToDo from './containers/OtherToDo'
import NotesContainer from './containers/NotesContainer'
import CalendarContainer from './containers/CalendarContainer'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import {fetchingToDoItems} from './redux/actions'
import { Menu, Segment } from 'semantic-ui-react'


class App extends Component {
  componentDidMount() {
    //this.props.fetchingNotes();
    this.props.fetchingToDoItems();
    //this.props.fetchingEvents();
  }

  render() {
    console.log("yo",this.props.todos)
    return (
      <div className="App">
      <Navbar />
      <Segment style={{border: "none"}} attached="bottom">
      <Switch>
        <Route exact path="/todo" component={OtherToDo}/>
        <Route exact path="/notes" component={NotesContainer}/>
        <Route exact path="/calendar" component={CalendarContainer}/>
        <Route path="/" component={Dashboard}/>
      </ Switch>
      </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
  //  fetchingNotes: ()=>{dispatch(fetchingNotes())},
    fetchingToDoItems: ()=>{dispatch(fetchingToDoItems())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
