import React from 'react'
import {connect} from 'react-redux'
import View from '../components/View'
import ToDoCompletedList from '../components/ToDoCompletedList'
import ToDoUncompletedList from '../components/ToDoUncompletedList'
import ToDoItem from '../components/ToDoItem'
import { todoActions } from '../redux/actions'
import {bindActionCreators } from 'redux'

class ToDoContainer extends React.Component {

  render() {
    console.log("to do container", this.props)
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
    let style = {
      position: 'relative',
      width: `420px`,
      borderRadius: globalStyles.borderRadius,
    }
    return (
      <div className="flex-container">
      <View column auto style={style}>
      <ToDoUncompletedList title={this.props.title}>
      {
        this.props.todos.map(({ description, title, checked},index) =>
          !checked && <ToDoItem
            key={index}
            id={index}
          //  title={title}
            description={description}
            checked={checked}
          />
        )
      }
      </ToDoUncompletedList>
      <ToDoCompletedList  title={this.props.title}>
      {
        this.props.todos.map(({ description, title, checked },index) =>
          checked && <ToDoItem
            key={index}
            id={index}
            //title={title}
            description={description}
            checked={checked}
          />
        )
      }
      </ToDoCompletedList>
      </View>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(ToDoContainer)
