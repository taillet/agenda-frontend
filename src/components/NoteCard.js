import React from 'react'
import { Card, Icon, Button, Modal, Form } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
import marked from 'marked'
import {connect} from 'react-redux'
import { editingNote, fetchingNotes, deletingNote } from '../redux/actions'

//on close of modal refresh notes from note container
class NoteCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      showPreview: false,
      previewTitle: this.props.note.title,
      previewDescription: this.props.note.description
    }
  }

  updateTitleState = (e) => {
    e.preventDefault()
    console.log("title state change",e.target.value)
    this.setState({previewTitle: e.target.value})

  }
  updateDescriptionState = (e) => {
    e.preventDefault()
    console.log("description state change",e.target.value)
    this.setState({previewDescription: e.target.value})
  }

  show = size => () => this.setState({ size, open: true })
  close = () =>  this.setState({ open: false})
  closePreview = () => this.setState({ showPreview: false })

  handleSubmitOfNote = e => {
    e.preventDefault()
    console.log("hit handle submit of note",e.target)
    let title = e.target.querySelector('#noteTitle').value
    let description = e.target.querySelector('#noteDescription').value
    this.props.editingNote(this.props.note.id,title,description)
  }

  deleteNote = (noteid) => {
    this.props.deletingNote(noteid)
  }

  openPreviewModal = note => {
    console.log("preview modal note", note)
    this.setState({showPreview: true})
  }
  // onCloseOfPreviewModal = () => {
  //   this.setState({showPreview:'false'})
  // }

  render() {
    const { open, size, showPreview } = this.state
    const getMarkdown = (raw) => {
      if (raw) {
        let markdown = marked(raw , { sanitize: true })
        return { __html: markdown }
      }
    }
    console.log("notecarrd props",this.props.note)
    return (
      <>
      <React.Fragment>
      <Card raised style={{width: "50vh", height: "60vh"}}>
      <Card.Content header={this.props.note.title} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto', height: "10vh"}}/>
      <Card.Content extra>
      <Icon name='pencil' />
      { moment(this.props.note.day.date).format('MMMM Do, YYYY')}
      <Button circular id="notebutton" icon='edit' size="large" onClick={this.show('small')}/>
      <Button style={{marginBottom: '2vh'}} circular id="deletebutton" icon='delete' size="large" onClick={(e)=>{e.preventDefault(); this.deleteNote(this.props.note.id)}}/>
      </Card.Content>
      <Card.Content style={{overflow: 'auto', height: "60%"}}>
      <div dangerouslySetInnerHTML={getMarkdown(this.props.note.description)} />
      </Card.Content>
      <Card.Content extra style={{marginBottom: '10px'}}>
      <TagSelect  tags={this.props.note.categories}/>
      </Card.Content>
      </Card>
      </React.Fragment>
      <React.Fragment>
      <Modal size={size} style={{ height: "70%"}} open={open} onClose={this.close}>
      <Modal.Header id="center">Edit Note</Modal.Header>
      <Modal.Actions id="modal column" >
      <Form onSubmit={(e)=>{this.handleSubmitOfNote(e); this.close()}}>
      <Form.Input  defaultValue={this.props.note.title} placeholder="Title" id={'noteTitle'}/>
      <Form.TextArea  style={{ height: "250px"}}  defaultValue={this.props.note.description} placeholder="Description" id={'noteDescription'}/>
      <Modal.Description className="ui secondary segment" id="centered">
      <p>Note descriptions support Markdown syntax.</p>
      </Modal.Description>
      <Button floated="left" labelPosition='right' content='Show Preview' onClick={()=>this.openPreviewModal(this.props.note)}/>
      <Button  type="submit" labelPosition='right' content='Save'/>
      </Form>
      </Modal.Actions>
      </Modal>

      <Modal open={showPreview} onClose={this.closePreview}>
      <Modal.Header  id="center">Edit Note</Modal.Header>
      <div className="flex-container" style={{height: '72vh'}} >
      <Modal.Actions   id="modal column" style={{marginRight:'4vh'}}>
      <Form onSubmit={(e)=>{this.handleSubmitOfNote(e); this.closePreview()}} style={{height: '100%'}}>
      <Form.Input onChange={(e)=>this.updateTitleState(e)} defaultValue={this.props.note.title} placeholder="Title" id={'noteTitle'}/>
      <Form.TextArea  style={{ height: "250px"}}  onChange={(e)=>this.updateDescriptionState(e)} defaultValue={this.props.note.description} placeholder="Description" id={'noteDescription'}/>
      <Modal.Description className="ui secondary segment" id="centered">
      <p>Note descriptions support Markdown syntax.</p>
      </Modal.Description >
      <Button  floated="left" type="submit" labelPosition='right' content='Save' />
      <Button floated="right" labelPosition='right' content='Exit'onClick={(e)=>{e.preventDefault(); this.closePreview()}}/>
      </Form>
      </Modal.Actions>
      <Modal.Content style={{width: '50%'}}>
      <Card raised style={{height: "91%", width: "130%", marginLeft: '4vh'}} id="modal column">
      <Card.Content header={this.state.previewTitle} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto'}}/>
      <Card.Content style={{overflow: 'auto', height: "87%"}}>
      <div dangerouslySetInnerHTML={getMarkdown(this.state.previewDescription)} />
      </Card.Content>
      </Card>
      </Modal.Content>
      </div>
      </Modal>
      </React.Fragment>
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

const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    editingNote: (noteid, title, description)=>dispatch(editingNote(noteid, title, description)),
    fetchingNotes: ()=>{dispatch(fetchingNotes())},
    deletingNote: (noteid)=>dispatch(deletingNote(noteid))

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(NoteCard)
