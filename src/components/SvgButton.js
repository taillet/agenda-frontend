import React, { Component } from 'react'
import { connect } from 'react-redux'
import { todoActions } from '../redux/actions'
import {bindActionCreators } from 'redux'

class SvgButton extends Component {
  render() {
    const style = {
      container: {
        cursor: 'pointer'
      },
      inner: {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '3',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }
    }

    return (
      <svg style={style.container} height="1.5em" width="1.5em" viewBox="0 0 24 24">
        <g style={style.inner}>
          {this.props.children}
        </g>
      </svg>
    )
  }
}

const mapStateToProps = state => {
  return {
    //props: state.something
    todos: state.todos
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    todosActions: bindActionCreators(todoActions, dispatch)

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SvgButton)
