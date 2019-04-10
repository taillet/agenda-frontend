import React from 'react'
import { Card, Icon, Button, Modal, Form } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
import marked from 'marked'
import {connect} from 'react-redux'
import { creatingNote } from '../redux/actions'

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

  render() {
    const getMarkdown = (raw) => {
      if (raw) {
        let markdown = marked(raw , { sanitize: true })
        return { __html: markdown }
      }
    }
    return(
      <Modal open={this.props.open} close={this.props.open == false}>
      <Modal.Header  id="center">Create Note</Modal.Header>
      <div className="flex-container">
      <Modal.Actions   id="modal column" >
      <Form  onSubmit={(e)=>{this.handleSubmitOfNote(e); this.closePreview()}}>
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
      <Modal.Content>
      <Card raised style={{height: "93%", marginLeft: '2rem'}} id="modal column">
      <Card.Content header={this.state.previewTitle} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
      <Card.Content style={{overflow: 'auto', height: "60%"}}>
      <div dangerouslySetInnerHTML={getMarkdown(this.state.previewDescription)} />
      </Card.Content>
      </Card>
      </Modal.Content>
      </div>
      </Modal>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    creatingNote: (title, description)=>dispatch(creatingNote(title, description)),
  }
}


export default connect(null,mapDispatchToProps)(CreateNoteModal)