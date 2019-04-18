import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {NavLink, withRouter} from 'react-router-dom'

class Navbar extends Component {
  state = { activeItem: this.props.location.pathname}
  componentDidUpdate = (prevProps,prevState) => {
    if (prevState.activeItem !== this.props.location.pathname) {
      this.setState({activeItem: this.props.location.pathname})
    }
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
      <Menu style={{marginTop: '1vh'}} attached='top' tabular>
      <NavLink exact to="/" >
        <Menu.Item name='/dashboard' active={activeItem === '/'} />
      </NavLink>
      <NavLink to="/todo" >
        <Menu.Item name='to do' active={activeItem === '/todo'} />
        </NavLink>
        <NavLink to="/notes" >
        <Menu.Item name='notes' active={activeItem === '/notes'} />
        </NavLink>
        <NavLink to="/calendar" >
        <Menu.Item name='calendar' active={activeItem === '/calendar'}/>
        </NavLink>
      </Menu>
      </div>
    )
  }
}
export default withRouter(Navbar)
