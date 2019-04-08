import React from 'react'
import {connect} from 'react-redux'
import View from '../components/View'
import { Button, Modal } from 'semantic-ui-react'
import ToDoRemoveButton from '../components/ToDoRemoveButton'
import ToDoEditButton from '../components/ToDoEditButton'
import ToDoToggleButton from '../components/ToDoToggleButton'
import { todoActions, addingTodo, togglingTodo, deletingTodo, editingTodo } from '../redux/actions'
import { bindActionCreators } from 'redux'

class ToDoItem extends React.Component {
  constructor() {
    super()

    this.state = {
      hover: false,
      editing: false,
      open: false
    }
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


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
    if(e.key === 'Enter' && e.target.value.length > 0 && this.props.todoid === undefined){
      console.log("new description enter")
      this.props.addingToDo(e.target.value)
    }
    else if (e.key === 'Enter' && e.target.value.length > 0 && this.props.todoid !== undefined ){
      console.log(" hit the not a new description enter")
      this.props.todosActions.addTodo()
    }
  }

  handleToggle() {
    this.props.togglingTodo(this.props.todoid, this.props.id, this.props.checked)
    console.log("toggle id this.props",this.props)
  }

  handleEdit(e) {
    this.props.editingTodo(this.props.todoid, this.props.id, e.target.value)
  }

  handleRemove() {
    this.props.deletingTodo(this.props.todoid, this.props.id)
  }

  componentDidMount() {
    !this.refs.checked && this.refs.todoInput.focus()
  }

  handleEditContent() {
    debugger
  }

  render() {
    const { open, size } = this.state

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

    return(
      <>
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
        <View onClick={this.show('mini')}>
          <ToDoEditButton
            hover={this.state.hover}
            editing={this.state.editing}
          />
        </View>
        <View onClick={this.handleRemove.bind(this)}>
          <ToDoRemoveButton
            hover={this.state.hover}
            editing={this.state.editing}
          />
        </View>
      </View>
      <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
        </>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    todosActions: bindActionCreators(todoActions, dispatch),
    addingToDo: (description)=>dispatch(addingTodo(description)),
    togglingTodo: (todoid, listid, checked)=>dispatch(togglingTodo(todoid, listid, checked)),
    deletingTodo: (todoid, listid)=>dispatch(deletingTodo(todoid, listid)),
    editingTodo: (todoid, listid, description)=>dispatch(editingTodo(todoid, listid, description))
  }
}

export default connect(null,mapDispatchToProps)(ToDoItem)
