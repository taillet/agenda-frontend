import React from 'react'
import { Card, Button, Modal, Form, Container, Header } from 'semantic-ui-react'
import TagSelect from './TagSelect'
import marked from 'marked'

class CreateNoteModal extends React.Component {
  constructor() {
    super()
    this.state = {previewTitle: '', previewDescription: '', categories: []}
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

  clearStates = () => {  this.setState({previewTitle: '', previewDescription: '', categories: []})}

  handleChangeOfTags = (e) => {
    console.log("hits handleChangeOfTags")
    this.setState({categories: e})
  }

  render() {
    const getMarkdown = (raw) => {
      if (raw) {
        let markdown = marked(raw , { sanitize: true })
        return { __html: markdown }
      }
    }
    return(
      <Modal open={this.props.open} close={this.props.open === false} onClose={this.props.closeModal}>
      <Modal.Header style={{marginRight:'4vh'}} id="center">Create Note</Modal.Header>
      <div className="flex-container" style={{height: '72vh'}}>
      <Modal.Actions   id="modal column" >
      <Form  onSubmit={(e)=>{this.props.handleSubmitOfNote(e, this.state.categories); this.clearStates();this.props.closeModal()}}>
      <Form.Input onChange={(e)=>this.updateTitleState(e)}  placeholder="Title" defaultValue={this.state.previewTitle !== '' ? this.state.previewTitle : null} id={'noteTitle'}/>
      <Form.TextArea  style={{ height: "180px"}}  onChange={(e)=>this.updateDescriptionState(e)}  defaultValue={this.state.previewDescription !== '' ? this.state.previewDescription : null} placeholder="Description" id={'noteDescription'}/>
      <Modal.Description className="ui secondary segment" id="centered">
      <p>Note descriptions support Markdown syntax.</p>
      </Modal.Description >
      <TagSelect tags={[]} handleChangeOfTags={this.handleChangeOfTags} />
      <Button floated="left" style={{marginTop: '1rem'}} type="submit" labelPosition='right' content='Save'/>
      <Button floated="right" style={{marginTop: '1rem'}} labelPosition='right' content='Exit' onClick={(e)=>{e.preventDefault();  this.clearStates(); this.props.closeModal()}}/>
      </Form>
      </Modal.Actions>
      <Modal.Content style={{width: '50%'}}>
      <Card raised style={{height: "87%", width: "130%", marginLeft: '4vh'}} id="modal column">
      <Container textAlign='center' style={{marginBottom: '2vh'}}>
      <Header as="h2"  style={{paddingTop: '15px', fontFamily: 'Montserrat', textTransform: 'uppercase', fontWeight: 300, overflowX: 'auto', overflowY: 'hidden'}}>{this.state.previewTitle}</Header>
      </Container>
      <Card.Content style={{display: 'flex', justifyContent: 'center', alignItems: 'top', overflow: 'auto', height: "80%"}}>
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
