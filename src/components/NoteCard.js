import React from 'react'
import { Card, Icon, Button, Modal, Form } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
import marked from 'marked'
import {connect} from 'react-redux'
import { editingNote } from '../redux/actions'


class NoteCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  handleSubmitOfNote = e => {
    e.preventDefault()
    console.log("hit handle submit of note",e.target)
    let title = e.target.querySelector('#noteTitle').value
    let description = e.target.querySelector('#noteDescription').value
    this.props.editingNote(this.props.note.id,title,description)
  }

  render() {
    const { open, size } = this.state
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

      <Card raised style={{width: "400px"}}>
      <Card.Content header={this.props.note.title} />
      <Card.Content extra>
      <Icon name='pencil' />
      { moment(this.props.note.day.date).format('MMMM Do, YYYY')}
      <Button circular id="notebutton" icon='edit' onClick={this.show('tiny')}/>
      </Card.Content>
      <Card.Content >
      <div dangerouslySetInnerHTML={getMarkdown(this.props.note.description)} />
      </Card.Content>
      <Card.Content extra>
      <TagSelect tags={this.props.note.categories}/>
      </Card.Content>
      </Card>
      </React.Fragment>
      <React.Fragment>
      <Modal size={size} open={open} onClose={this.close}>
      <Modal.Header id="center">Edit Note</Modal.Header>
      <Modal.Actions id="modal column">
      <Form onSubmit={(e)=>{this.handleSubmitOfNote(e); this.close()}}>
      <Form.Input  defaultValue={this.props.note.title} placeholder="Title" id={'noteTitle'}/>
      <Form.TextArea  defaultValue={this.props.note.description} placeholder="Description" id={'noteDescription'}/>
      <Modal.Description className="ui secondary segment" id="centered">
      <p>Note descriptions support Markdown syntax.</p>
      </Modal.Description>
      <Button type="submit" labelPosition='right' content='Save'/>
      </Form>
      </Modal.Actions>

      </Modal>
      </React.Fragment>
</>
    )
  }
}


const mapStateToProps = state => {
  return {
    //props: state.something
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    editingNote: (noteid, title, description)=>dispatch(editingNote(noteid, title, description))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(NoteCard)
