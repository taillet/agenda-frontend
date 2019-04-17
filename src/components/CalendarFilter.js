import React from 'react'
import Select from 'react-select';
import {connect} from 'react-redux'
import { fetchingCategories } from '../redux/actions'
import { Container, Button, Modal } from 'semantic-ui-react'
import CreateEventModal from './CreateEventModal'

const colorSchemeOptions = [{label: "None", value: 'none'}, {label: "By Type", value: "type"},{label: "By Category", value: "category"}, {label: "By Priority", value: "priority"}]

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
      <>
      <Container style={{marginTop: '.5vh'}}>
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
          defaultValue="none"
          onChange={this.props.changeFilter}
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          options={total}
          />
          </Container>
          <Container style={{marginTop: '1vh'}}>
          <Select
          theme={(theme) => ({
          ...theme,
          colors: {
          ...theme.colors,
            primary25: '#cbeded',
            primary: '#cbeded'
            },
          })}
            placeholder="Color Scheme"
              onChange={this.props.changeColorFilter}
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              options={colorSchemeOptions}
              />
              </Container>
              <CreateEventModal trigger={<Button floated="center" style={{marginTop: '1rem', fontFamily: 'Montserrat', textTransform: 'uppercase'}} labelPosition='right' content='Add Event'/>}/>
              </>
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
