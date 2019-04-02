import React, { Component } from 'react'
import { Accordion } from 'semantic-ui-react'

const level1Panels = [{ key: 'panel-1a', title: 'Go to Flatiron', content: 'Take Subway' },
{ key: 'panel-1a', title: 'Get Coffee from Small Pantry', content: 'Dont forget milk and sugar' },
{ key: 'panel-1a', title: 'Eat lunch', content: 'Be healthy, okay?' },
{ key: 'panel-1a', title: 'Go home', content: 'Tell mom and dad when to pick you up' },
]

const Level1Content = (
<div>
  <Accordion.Accordion panels={level1Panels} />
</div>
)

const rootPanels = [
{ key: 'panel-1', title: 'Daily To Do List', content: { content: Level1Content } }
]

const AccordionToDo = () => <Accordion defaultActiveIndex={0} panels={rootPanels} styled />

export default AccordionToDo
