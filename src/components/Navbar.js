import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'

class Navbar extends Component {
  state = { activeItem: 'dashboard' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div>
      <Menu attached='top' tabular>
        <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
        <Menu.Item name='to do' active={activeItem === 'to do'} onClick={this.handleItemClick} />
        <Menu.Item name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick}/>
        <Menu.Item name='notes' active={activeItem === 'notes'} onClick={this.handleItemClick} />
      </Menu>
      </div>
    )
  }
}
export default Navbar
