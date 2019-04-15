import React from 'react'
import {connect} from 'react-redux'
import View from '../components/View'
import ToDoCompletedList from '../components/ToDoCompletedList'
import ToDoUncompletedList from '../components/ToDoUncompletedList'
import ToDoItem from '../components/ToDoItem'
import { todoActions } from '../redux/actions'
import {bindActionCreators } from 'redux'
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
      <div className="flex-container">
      <View column auto style={style}>
      <Card raised style={{width: `150vh`}}>
      <ToDoUncompletedList title={this.props.title}>
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
      </Card>
      </View>
      </div>
    )
  }
}

export default ToDoContainer
