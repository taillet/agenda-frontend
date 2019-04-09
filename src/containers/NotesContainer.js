import React from 'react'
import {connect} from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose, bindActionCreators } from 'redux'
import { Card } from 'semantic-ui-react'
import { fetchingNotes } from '../redux/actions'
import NoteCard from '../components/NoteCard'
class NotesContainer extends React.Component {
  componentDidMount() {
    this.props.fetchingNotes()
  }

  render() {
    return (
      <div className="grid-container">
      Hi I'm the notes container
      <Card.Group>
      {this.props.notes.map(note=> <NoteCard note={note}/>)}
      </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //props: state.something
    notes: state.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
     fetchingNotes: ()=>{dispatch(fetchingNotes())},

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesContainer)
