import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Dashboard from './containers/Dashboard'
import TodoContainer from './containers/TodoContainer'
import NotesContainer from './containers/NotesContainer'
import CalendarContainer from './containers/CalendarContainer'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import {fetchingNotes, fetchingToDoItems} from './redux/actions'


class App extends Component {
  componentDidMount() {
    this.props.fetchingNotes();
    this.props.fetchingToDoItems();
  }

  render() {
    console.log("yo",this.props)
    return (
      <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/todo" component={TodoContainer}/>
        <Route exact path="/notes" component={NotesContainer}/>
        <Route exact path="/calendar" component={CalendarContainer}/>
        <Route path="/" component={Dashboard}/>
      </ Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //props: state.something
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    fetchingNotes: ()=>{dispatch(fetchingNotes())},
    fetchingToDoItems: ()=>{dispatch(fetchingToDoItems())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
