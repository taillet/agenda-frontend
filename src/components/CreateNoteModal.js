import React from 'react'
import { Card, Icon, Button, Modal, Form } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
import marked from 'marked'

class CreateNoteModal extends React.Component {
  constructor() {
    super()
    this.state = {previewTitle: '', previewDescription: ''}
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

  clearStates = () => {  this.setState({previewTitle: '', previewDescription: ''})}

  render() {
    const getMarkdown = (raw) => {
      if (raw) {
        let markdown = marked(raw , { sanitize: true })
        return { __html: markdown }
      }
    }
    return(
      <Modal open={this.props.open} close={this.props.open == false} onClose={this.props.closeModal}>
      <Modal.Header style={{marginRight:'4vh'}} id="center">Create Note</Modal.Header>
      <div className="flex-container" style={{height: '72vh'}}>
      <Modal.Actions   id="modal column" >
      <Form  onSubmit={(e)=>{this.props.handleSubmitOfNote(e); this.clearStates();this.props.closeModal()}}>
      <Form.Input onChange={(e)=>this.updateTitleState(e)}  placeholder="Title" id={'noteTitle'}/>
      <Form.TextArea  style={{ height: "180px"}}  onChange={(e)=>this.updateDescriptionState(e)}  placeholder="Description" id={'noteDescription'}/>
      <Modal.Description className="ui secondary segment" id="centered">
      <p>Note descriptions support Markdown syntax.</p>
      </Modal.Description >
      <TagSelect tags={[]}/>
      <Button floated="left" style={{marginTop: '1rem'}} type="submit" labelPosition='right' content='Save'/>
      <Button floated="right" style={{marginTop: '1rem'}} labelPosition='right' content='Exit' onClick={(e)=>{e.preventDefault(); this.props.closeModal()}}/>
      </Form>
      </Modal.Actions>
      <Modal.Content style={{width: '50%'}}>
      <Card raised style={{height: "87%", width: "130%", marginLeft: '4vh'}} id="modal column">
      <Card.Content header={this.state.previewTitle} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto'}}/>
      <Card.Content style={{overflow: 'auto', height: "80%"}}>
      <div dangerouslySetInnerHTML={getMarkdown(this.state.previewDescription)} />
      </Card.Content>
      </Card>
      </Modal.Content>
      </div>
      </Modal>
    )
  }
}


export default CreateNoteModal
