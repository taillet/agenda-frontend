
import React from 'react'
import View from './View'
import {connect} from 'react-redux'
import { todoActions } from '../redux/actions'
import {bindActionCreators } from 'redux'

class ToDoUncompletedList extends React.Component {
  handleAdd() {
    this.props.todosActions.addTodo()
  }

  render() {
    console.log("uncompleted", this.props.children)
    console.log(this.props.todos)


    const hasUncompleted = this.props.todos
        .filter((todo) => !todo.checked)
        .length !== 0

    const hasCompleted = this.props.todos
        .filter((todo) => todo.checked)
        .length !== 0


              const globalStyles = {
                colors: {
                  primary: {
                    light: '#ffffff',
                    base: '#e5e5e5',
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
                background: globalStyles.colors.primary.light,
                padding: '4em 3em',
                borderBottomLeftRadius: globalStyles.borderRadius,
                borderBottomRightRadius: globalStyles.borderRadius
              }
            }

    if (!hasUncompleted) {
      return (
        <View column style={style.container}>
          <p style={style.done}>Well Done! </p>
        </View>
      )
    } else {
      return (
        <View column style={style.container}>
          <View row style={style.header}>
            <h3>TO DO</h3>
            <p onClick={this.handleAdd.bind(this)}>Add</p>
          </View>
          <View column>
            { this.props.children }
          </View>
        </View>
      )
    }
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


export default connect(mapStateToProps,mapDispatchToProps)(ToDoUncompletedList)
