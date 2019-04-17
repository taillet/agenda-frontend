import React from 'react'
import View from '../components/View'
import ToDoCompletedList from '../components/ToDoCompletedList'
import ToDoUncompletedList from '../components/ToDoUncompletedList'
import ToDoItem from '../components/ToDoItem'
import { Card } from 'semantic-ui-react'

class ToDoContainer extends React.Component {

  render() {
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
      width: `150vh`,
      borderRadius: globalStyles.borderRadius
    }
    return (
      <div className="flex-container" >
      <View column auto style={style}>
      <Card raised style={{width: `150vh`}}>
      <ToDoUncompletedList>
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
      </ToDoUncompletedList>
      </Card>
      {this.props.todos.filter(todo=>todo.checked === true).length > 0 ?
      <Card raised style={{width: `150vh`}}>
      <ToDoCompletedList >
      {
        this.props.todos.map(({ day, description, title, checked, id, priority, categories },index) =>
          checked && <ToDoItem
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
      </ToDoCompletedList>
      </Card> : null}
      </View>
      </div>
    )
  }
}

export default ToDoContainer
