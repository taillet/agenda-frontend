import React from 'react'
import {connect} from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose, bindActionCreators } from 'redux'
import { Card } from 'semantic-ui-react'
import { fetchingNotes } from '../redux/actions'
import NoteCard from '../components/NoteCard'
import NoteSearchBar from '../components/NoteSearchBar'

class NotesContainer extends React.Component {
  componentDidMount() {
    this.props.fetchingNotes()
  }

  onSearchSelect = (result) => console.log("result from notes container", result)

  render() {
    return (
      <>
      <div className="flex-container">
      <NoteSearchBar className="row" notes={this.props.notes} onSearchSelect={this.onSearchSelect}/>
      </div>
      <div className="flex-container">
      <Card.Group>
      {this.props.notes.map(note=> <NoteCard note={note}/>)}
      </Card.Group>
      </div>
      </>
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
     fetchingNotes: ()=>{dispatch(fetchingNotes())}

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NotesContainer)
