
import React from 'react'
import View from './View'
import {connect} from 'react-redux'
import { todoActions } from '../redux/actions'
import { bindActionCreators } from 'redux'

class ToDoCompletedList extends React.Component {
  handleClear() {
    this.props.todosActions.clearTodos()
  }

  render() {

    const hasCompleted = this.props.todos
      .filter((todo) => todo.checked)
      .length !== 0

      const globalStyles = {
        colors: {
          primary: {
            light: '#00ff00',
            base: '#e0ffff',
            dark: '#000000'
          },
          neutral: {
            base: '#ffffff'
          }
        },
        borderRadius: '5px',
      }

    const style = {
      header: {
        fontWeight: '400',
        paddingBottom: '1em',
        borderBottom: `2px solid`
      },
      container: {
        display: hasCompleted && 'flex',
        color: globalStyles.colors.primary.dark,
        background: globalStyles.colors.primary.base,
        padding: '4em 3em',
        borderBottomLeftRadius: globalStyles.borderRadius,
        borderBottomRightRadius: globalStyles.borderRadius,
        border: '1px solid #d4d4d5',
        borderTop: 'none'
      }
    }

    return !hasCompleted ? null : (
      <View column style={style.container} >
        <View row style={style.header}>
          <h3>COMPLETED: </h3>
          <p onClick={this.handleClear.bind(this)}>Clear</p>
        </View>
        <View column>
          { this.props.children }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    todosActions: bindActionCreators(todoActions, dispatch)

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoCompletedList)
