import React from 'react'
import View from './View'
import {connect} from 'react-redux'
import { todoActions } from '../redux/actions'
import {bindActionCreators } from 'redux'
import { Header, Button, Container } from 'semantic-ui-react'

class ToDoUncompletedList extends React.Component {

  handleAdd() {
    this.props.todosActions.addTodo()
  }

  render() {
    const hasCompleted = this.props.todos
        .filter((todo) => todo.checked)
        .length !== 0

    const hasUncompleted = this.props.todos
        .filter((todo) => !todo.checked)
        .length !== 0

    const globalStyles = {
      colors: {
        primary: {
          light: '#ffffff',
          base: '#e0ffff',
          dark: '#000000'
        },
        neutral: {
          base: '#ffffff'
        }
      },
      borderRadius: '10px',
    }

  const style = {
    header: {
      fontWeight: '400',
      paddingBottom: '1em',
      borderBottom: `1px solid rgb(212,212,213)`
    },
    container: {
      color: globalStyles.colors.primary.dark,
      background: globalStyles.colors.primary.light,
      padding: '4em 3em',
      border: '1px solid #d4d4d5',
      borderRadius: globalStyles.borderRadius
    },
    myButtonClass: {
             textDecoration: 'underline'
    }
  }

    if (!hasUncompleted) {
      return (
        <View column style={style.container}>
          <p style={style.done}>You don't have anything on your To Do List, yet. </p>
          <p style={style.myButtonClass} onClick={this.handleAdd.bind(this)}>Add To Do</p>
        </View>
      )
    } else {
      return (
        <View column style={style.container}>
          <View row style={style.header}>
          <Container centered>
          <Header as="h2" style={{fontFamily: 'Montserrat', textTransform: 'uppercase', fontWeight: 300}}>TO DO </Header>
          </Container>
          </View>
          <View column>
            { this.props.children }
          </View>
          <Container textAlign='right' style={{marginTop: '2vh'}}>
          <Button labelPosition='right' style={{fontFamily: 'Montserrat',textTransform: 'uppercase' }} floated="right" onClick={this.handleAdd.bind(this)} content="Add"/>
          </Container>
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
