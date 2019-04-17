import React from 'react'
import Select from 'react-select';
import { Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { fetchingCategories } from '../redux/actions'


class CalendarFilter extends React.Component {
  componentDidMount() {
    this.props.fetchingCategories()
  }
  render() {
    const options = [{label: "No Filter", value: 'none'},{label: "Events Only", value: 'events'}, {label: "To Do Only", value: 'todos'}, {label: "Notes Only", value: 'notes'}]
    const cats = this.props.categories.map(cat=>{return {label: cat.name, value: cat.name}})
    const total = options.concat(cats)
    console.log("are there categories in calendar filer", this.props.categories)
    return(
      <Select
      theme={(theme) => ({
      ...theme,
      colors: {
      ...theme.colors,
        primary25: '#cbeded',
        primary: '#cbeded'
        },
      })}
        placeholder="Filter"
          onChange={this.props.changeFilter}
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          options={total}
          />
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    fetchingCategories: ()=>{dispatch(fetchingCategories())},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarFilter)
