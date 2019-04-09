import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

const CardExampleExtraContent = props => (
  <Card>
    <Card.Content header={props.note.title} />
    <Card.Content description={props.note.description} />
    <Card.Content extra>
      <Icon name='edit' />
      {props.note.day.date}
    </Card.Content>
  </Card>
)

export default CardExampleExtraContent
