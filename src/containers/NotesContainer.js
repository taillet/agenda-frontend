import React from 'react'
import {connect} from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose, bindActionCreators } from 'redux'
import { Card, Icon } from 'semantic-ui-react'
import { fetchingNotes } from '../redux/actions'
import NoteCard from '../components/NoteCard'
import NoteSearchBar from '../components/NoteSearchBar'
import CreateNoteModal from '../components/CreateNoteModal'

class NotesContainer extends React.Component {
  constructor() {
    super()
    this.state = {iconColor: 'black', open: false}
  }

  componentDidMount() {
    this.props.fetchingNotes()
  }

  onSearchSelect = (result) => console.log("result from notes container", result)
  openCreateModal = () => this.setState({open: true})
  closeCreateModal = () => this.setState({open: false})

  setColor = color => this.setState({iconColor: color})

  render() {
    return (
      <>
      <div className="flex-container">
      <NoteSearchBar className="row" notes={this.props.notes} onSearchSelect={this.onSearchSelect}/>
      <Icon onClick={(e)=>{e.preventDefault(); this.openCreateModal()}} style={{marginTop: '8px', marginLeft: '4px'}} color={this.state.iconColor} name="add" onMouseEnter={()=>this.setColor('teal')} onMouseLeave={()=>this.setColor('black')} size={'large'}/>
      <CreateNoteModal open={this.state.open} closeModal={this.closeCreateModal}/>
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
