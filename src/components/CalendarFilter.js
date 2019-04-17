import React from 'react'
import { Select } from 'semantic-ui-react'

class CalendarFilter extends React.Component {

  render() {
    const options = [{text: "Events Only"}, {text: "To Do List Only"}, {text: "Notes Only"}]
    const cats = this.props.categories.map(cat=>{return {text: cat.name+` Category`}})
    const total = options.concat(cats)
    console.log("are there categories in calendar filer", this.props.categories)
    return(
      <Select placeholder='Filter Calendar' options={total} />
    )
  }
}

export default CalendarFilter
