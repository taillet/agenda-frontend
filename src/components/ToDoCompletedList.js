
import React from 'react'
import View from './View'
import {connect} from 'react-redux'
import { todoActions, clearingTodos } from '../redux/actions'
import { bindActionCreators } from 'redux'
import { Header, Button, Container } from 'semantic-ui-react'

class ToDoCompletedList extends React.Component {
  handleClear() {
    this.props.clearingTodos()
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
        borderRadius: '10px',
      }

    const style = {
      header: {
        fontWeight: '400',
        paddingBottom: '1em',
        borderBottom: `1px solid rgb(212,212,213)`
      },
      container: {
        display: hasCompleted && 'flex',
        color: globalStyles.colors.primary.dark,
        background: globalStyles.colors.primary.base,
        padding: '4em 3em',
        borderRadius: globalStyles.borderRadius,
        border: '1px solid #d4d4d5',
      }
    }

    return !hasCompleted ? null : (
      <View column style={style.container} >
        <View row style={style.header}>
        <Container centered>
        <Header as="h2" style={{fontFamily: 'Montserrat', textTransform: 'uppercase', fontWeight: 300}}>Completed </Header>
        </Container>
        </View>
        <View column>
          { this.props.children }
        </View>
        <Container textAlign='right' style={{marginTop: '2vh'}}>
        <Button labelPosition='right' style={{fontFamily: 'Montserrat',textTransform: 'uppercase' }} floated="right" onClick={this.handleClear.bind(this)} content="Clear"/>
        </Container>
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
    todosActions: bindActionCreators(todoActions, dispatch),
    clearingTodos: ()=>dispatch(clearingTodos())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoCompletedList)
