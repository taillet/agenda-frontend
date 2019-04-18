import React from 'react'
import { Card, Icon, Button, Modal, Form, Header, Container } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
import marked from 'marked'
import {connect} from 'react-redux'
import { editingNote, fetchingNotes, deletingNote, editNoteDate } from '../redux/actions'
import "react-datepicker/dist/react-datepicker.css";


//on close of modal refresh notes from note container
class NoteCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      showPreview: false,
      previewTitle: this.props.note.title,
      previewDescription: this.props.note.description,
      categories: this.props.note.categories,
      showDatePicker: false,
      date: this.props.day ? this.props.day.date : new Date()
    }
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(date) {
    this.setState({
      date: date
    })
    this.props.editNoteDate(this.props.note.id, date)
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
  showPicker = size => () => { console.log("hello")
    this.setState({ size, showDatePicker: true }); }

  closeDatePicker = () => {
    console.log("hello");
    this.setState({ showDatePicker: false })
  }

  close = () =>  this.setState({ open: false})

  closePreview = () => this.setState({ showPreview: false, previewTitle: this.props.note.title, previewDescription: this.props.note.description })

  handleSubmitOfNote = (e, categories) => {
    e.preventDefault()
    console.log("hit handle submit of note",e.target)
    let title = e.target.querySelector('#noteTitle').value
    let description = e.target.querySelector('#noteDescription').value
    this.props.editingNote(this.props.note.id,title,description, categories)
  }

  deleteNote = (noteid) => {
    this.props.deletingNote(noteid)
  }

  openPreviewModal = note => {
    console.log("preview modal note", note)
    this.setState({showPreview: true, previewTitle: note.title, previewDescription: note.description})
  }

  handleChangeOfTags = (e) => {
    console.log("hits handleChangeOfTags")
    this.setState({categories: e})
  }

  handleEditOfTags = (noteid, title, description,categoryHashArray) => {
    console.log(noteid, title, description,categoryHashArray)
      this.props.editingNote(noteid,title,description, categoryHashArray)
  }

  render() {
    const { open, size, showPreview, showDatePicker } = this.state
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
      <Card raised style={{borderRadius: '10px', width: "55vh", height: "60vh"}} onBlur={(e)=>{e.preventDefault(); if (this.props.categories !== this.state.categories) {this.handleEditOfTags(this.props.note.id, this.props.note.title,this.props.note.description, this.state.categories)}}}>
      <Header as="h2" style={{paddingTop: '15px', fontFamily: 'Montserrat', textTransform: 'uppercase', fontWeight: 300, overflowX: 'auto', overflowY: 'hidden'}}>{this.props.note.title}</Header>
      <Card.Content extra>
      <Icon name='pencil' />
      { moment(this.props.note.day.date).format('MMMM Do, YYYY')}
      <Button circular id="notebutton" icon='edit' size="large" onClick={this.show('small')}/>
      <Button circular id="calendarbutton" icon='calendar alternate outline' size="large" onClick={this.showPicker('tiny')}/>
      <Button style={{marginBottom: '2vh'}} circular id="deletebutton" icon='delete' size="large" onClick={(e)=>{e.preventDefault(); this.deleteNote(this.props.note.id)}}/>
      </Card.Content>
      <Card.Content style={{overflow: 'auto', height: "60%", marginLeft: '2vw', textAlign:'left'}}>
      <div dangerouslySetInnerHTML={getMarkdown(this.props.note.description)} />
      </Card.Content>
      <Card.Content extra style={{marginBottom: '10px'}}>
      <TagSelect  tags={this.props.note.categories} handleChangeOfTags={this.handleChangeOfTags} />
      </Card.Content>
      </Card>
      </React.Fragment>
      <React.Fragment>
      <Modal size={size} style={{ height: "70%"}} open={open} onClose={this.close}>
      <Modal.Header id="center">Edit Note</Modal.Header>
      <Modal.Actions id="modal column" >
      <Form onSubmit={(e)=>{this.handleSubmitOfNote(e, this.state.categories); this.close()}}>
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

      <Modal  style={{backgroundColor: 'none', width: '50vh'}} basic open={showDatePicker} onClose={this.closeDatePicker}>
      <Modal.Content style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
      <DatePicker
        inline
        showTimeSelect
        selected={this.state.date}
        onChange={this.handleChange}
        shouldCloseOnSelect={false}
        id="datepicker"
        />
        </Modal.Content>
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
      <Container textAlign='center' style={{marginBottom: '2vh'}}>
      <Header as="h2"  style={{paddingTop: '15px', fontFamily: 'Montserrat', textTransform: 'uppercase', fontWeight: 300, overflowX: 'auto', overflowY: 'hidden'}}>{this.state.previewTitle}</Header>
      </Container>
      <Card.Content style={{display: 'flex', justifyContent: 'center',  marginLeft: '2vw', alignItems: 'top', overflow: 'auto', height: "87%"}}>
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
    editingNote: (noteid, title, description,categoryHashArray)=>dispatch(editingNote(noteid, title, description, categoryHashArray)),
    fetchingNotes: ()=>{dispatch(fetchingNotes())},
    deletingNote: (noteid)=>dispatch(deletingNote(noteid)),
    editNoteDate: (noteid, date)=>dispatch(editNoteDate(noteid, date))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(NoteCard)
