import React from 'react'
import {connect} from 'react-redux'
import View from '../components/View'
import ToDoRemoveButton from '../components/ToDoRemoveButton'
import ToDoToggleButton from '../components/ToDoToggleButton'
import { todoActions, addingTodo} from '../redux/actions'
import {bindActionCreators } from 'redux'

class ToDoItem extends React.Component {
  constructor() {
    super()

    this.state = {
      hover: false,
      editing: false
    }
  }

  static defaultProps = {
    checked: false,
  };

  enterHover() {
    this.setState({hover: true})
  }

  leaveHover() {
    this.setState({hover: false})
  }

  enterEditing() {
    this.setState({editing: true})
  }

  leaveEditing(e) {
    this.setState({editing: false})

    // prevents empty todos being created
    if (e.target.value.length < 1) {
      this.props.todosActions.removeTodo(this.props.id)
    }
  }
  handleAdd(e) {
    if(e.key === 'Enter' && e.target.value.length > 0){
      this.props.addingToDo(e.target.value)
    }
  }

  handleToggle() {
    this.props.todosActions.toggleTodo(this.props.id)
    console.log("toggle id",this.props.id)
  }

  handleEdit(e) {
    this.props.todosActions.editTodo(this.props.id, e.target.value)
  }

  handleRemove() {
    this.props.todosActions.removeTodo(this.props.id)
  }

  componentDidMount() {
    !this.refs.checked && this.refs.todoInput.focus()
  }

  render() {
    const globalStyles = {
      colors: {
        primary: {
          light: '#000000',
          base: '#e5e5e5',
          dark: '#000000'
        },
        neutral: {
          base: '#ffffff'
        }
      },
      borderRadius: '5px',
    }
    const { colors } = globalStyles
    const { checked } = this.props
    const { hover, editing } = this.state

    const style = {
      input: {
        fontSize: '1em',
        width: '100%',
        marginLeft: '0.5em',
        marginRight: '0.5em'
      },
      container: {
        fontSize: '1em',
        fontWeight: '100',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        borderBottom: `1px dashed`,
        transition: '.3s',
        color: checked && hover ? colors.primary.light : hover ? colors.primary.dark : colors.primary.dark,
        textDecoration: checked && !editing ? 'line-through' : 'none'
      }
    }
    console.log("to do item",this.props)

    return(
      <View style={style.container}
        onMouseEnter={this.enterHover.bind(this)}
        onMouseLeave={this.leaveHover.bind(this)}
      >
        <View onClick={this.handleToggle.bind(this)}>
          <ToDoToggleButton active={this.props.checked} />
        </View>
        <input
          type="text"
          ref="todoInput"
          style={style.input}
          value={this.props.description}
          onChange={this.handleEdit.bind(this)}
          onFocus={this.enterEditing.bind(this)}
          onBlur={this.leaveEditing.bind(this)}
          onKeyPress={this.handleAdd.bind(this)}
        />
        <View onClick={this.handleRemove.bind(this)}>
          <ToDoRemoveButton
            hover={this.state.hover}
            editing={this.state.editing}
          />
        </View>
      </View>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    todosActions: bindActionCreators(todoActions, dispatch),
    addingToDo: (description)=>dispatch(addingTodo(description))

  }
}

export default connect(null,mapDispatchToProps)(ToDoItem)
