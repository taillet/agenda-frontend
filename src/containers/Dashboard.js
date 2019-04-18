import ToDoUncompletedList from '../components/ToDoUncompletedList'
import ToDoItem from '../components/ToDoItem'
import CategoryColorSelector from '../components/CategoryColorSelector'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import { todoActions, creatingNote } from '../redux/actions'
import CreateEvent from '../components/CreateEvent'
import { Container } from 'semantic-ui-react'
import CreateNoteComponent from '../components/CreateNoteComponent'

class Dashboard extends React.Component {
  render() {

    return (
      <Container style={{display: 'flex', justifyContent: 'space-evenly', width: '90vw'}}>
      <Container style={{width: '30vw', marginTop: '5vh'}}>
      <ToDoUncompletedList>
      <Container style={{height: '10.7vh', overflow: 'auto'}}>

      {
        this.props.todos.sort((a, b)=>a.id-b.id).map(({ day, description, title, checked, id, priority, categories}, index) =>
          !checked && <ToDoItem
            key={index}
            id={index}
            todoid={id}
            description={description}
            deadline={day}
            checked={checked}
            priority={priority}
            categories={categories}
          />
        )
      }
      </Container>
      </ToDoUncompletedList>
      <CategoryColorSelector/>
      </Container>
      <CreateEvent />
      <CreateNoteComponent creatingNote={this.props.creatingNote}/>
      </Container>
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
    todosActions: bindActionCreators(todoActions, dispatch),
    creatingNote: (title, description, categoryHashArray)=>dispatch(creatingNote(title, description, categoryHashArray))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
