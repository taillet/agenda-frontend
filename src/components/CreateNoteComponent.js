import React from 'react'
import {  Button, Form, Header } from 'semantic-ui-react'
import TagSelect from './TagSelect'

class CreateNoteComponent extends React.Component {
  constructor() {
    super()
    this.state = {categories: []}
  }

  clearStates = (e) => {  this.setState({categories: []})
  e.target.querySelector('#noteTitle').value = ""
  e.target.querySelector('#noteDescription').value = ""
}

  handleChangeOfTags = (e) => {
    console.log("hits handleChangeOfTags")
    this.setState({categories: e})
  }

  handleSubmitOfNote = (e,categoryHashArray) => {
    e.preventDefault()
    console.log("handle submit of note", e.target)
    let title = e.target.querySelector('#noteTitle').value
    let description = e.target.querySelector('#noteDescription').value
    this.props.creatingNote(title,description, categoryHashArray)
  }

  render() {
    return(
      <div style={{marginTop: '5vh', width: '29vw'}}>
      <Form style={{border: '1px solid rgb(212,212,213)', borderRadius: '10px', paddingTop: '5vh', paddingLeft: '1vw', paddingRight: '1vw', paddingBottom: '9vh'}} onSubmit={(e)=>{this.handleSubmitOfNote(e, this.state.categories); this.clearStates(e)}}>
      <Header as="h2" style={{fontFamily: 'Montserrat', textTransform: 'uppercase', fontWeight: 300}}>ADD NOTE</Header>
      <Form.Input placeholder="Title" id={'noteTitle'}/>
      <Form.TextArea  style={{ height: "149px"}}  defaultValue={this.state.previewDescription !== '' ? this.state.previewDescription : null} placeholder="Description" id={'noteDescription'}/>
      <p style={{marginBottom: '2vh'}}>Note descriptions support Markdown syntax.</p>
      <TagSelect tags={[]} handleChangeOfTags={this.handleChangeOfTags} />
      <Button floated="left" style={{marginTop: '1.7rem', fontFamily: 'Montserrat', textTransform: 'uppercase'}} type="submit" labelPosition='right' content='Save'/>
      <Button floated="right" style={{marginTop: '1.7rem', fontFamily: 'Montserrat', textTransform: 'uppercase'}} labelPosition='right' content='Exit' onClick={(e)=>{e.preventDefault();  this.clearStates();}}/>
      </Form>
      </div>
    )
  }
}


export default CreateNoteComponent
