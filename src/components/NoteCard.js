import React from 'react'
import { Card, Icon, Button, Modal } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
import marked from 'marked'


class CardExampleExtraContent extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }
  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state
    const getMarkdown = (raw) => {
      if (raw) {
        let markdown = marked(raw , { sanitize: true })
        return { __html: markdown }
      }
    }
    console.log("notecarrd props",this.props)
    return (
      <>
      <Card raised>
      <Card.Content header={this.props.note.title} />
      <Card.Content>
      <div dangerouslySetInnerHTML={getMarkdown(this.props.note.description)} />
      </Card.Content>
      <Card.Content extra>
      <Icon name='pencil' />
      { moment(this.props.note.day.date).format('MMMM Do, YYYY')}
      <Button circular id="notebutton" icon='edit' onClick={this.show('tiny')}/>
      </Card.Content>
      <Card.Content extra>
      <TagSelect tags={this.props.note.categories}/>
      </Card.Content>
      </Card>

      <Modal size={size} open={open} onClose={this.close}>
      <Modal.Header id="center">Edit Note</Modal.Header>
      <Modal.Content id="modal column">
      <div class="ui form">
      <div class="field">
      <input type="text" placeholder="Title"/>
      </div>
      <div class="field">
      <textarea placeholder="Description"></textarea>
      </div>
      <div class="ui secondary segment" id="centered">
      <p>Note descriptions support Markdown syntax.</p>
      </div>
      </div>
      <p> </p>
      </Modal.Content>
      <Modal.Actions>
      <Button labelPosition='right' content='Save' />
      </Modal.Actions>
      </Modal>
      </>
    )
  }
}

export default CardExampleExtraContent
