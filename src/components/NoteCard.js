import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import moment from 'moment'
const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

const CardExampleExtraContent = props => (
  <Card>
    <Card.Content header={props.note.title} />
    <Card.Content description={props.note.description} />
    <Card.Content extra>
      <Icon name='pencil' />
      { moment(props.note.day.date).format('MMMM Do, YYYY')}
    </Card.Content>
  </Card>
)

export default CardExampleExtraContent
