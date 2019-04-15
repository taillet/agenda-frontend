import React from 'react'
import { Card, Icon, Button, Container, Form, Label } from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
import marked from 'marked'
import {connect} from 'react-redux'
import { creatingEvent } from '../redux/actions'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

class CreateEvent extends React.Component {
  constructor() {
    super()

    this.state = {startDate: new Date, endDate: new Date, tags: [], priority: {label: 'Low', value: 'Low'}}
  }

  handleSubmit = (form) => {
    let title = form.querySelector('#createnotetitle').value
    let description = form.querySelector('#createnotedescription').value
    let start = this.state.startDate
    let end = this.state.endDate
    let priority = this.state.priority.label
    let tags = this.state.tags
    this.props.creatingEvent(start,end,title,description,priority,tags)
  }

  handleChangeOfTags = (tags) => {
    this.setState({tags: tags})

  }

  handleChangeStart = (date) => {
    let endDate = this.state.endDate
      if (endDate < date) {
      this.setState({startDate: date, endDate: date})}
      else {
      this.setState({startDate: date})}
  }

  handleChangeEnd = (date) => {
    this.setState({endDate: date})
  }

  handleChangeOfPriorityLevel = (level) => {
    this.setState({priority: level})
  }

  render() {
    return(
      <div style={{marginTop: '5vh'}}>
      <Form  onSubmit={(e)=>{this.handleSubmit(e.target)}}>

      <Container style={{marginBottom: '3vh', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
      <DatePicker
        selected={this.state.startDate}
        selectsStart
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect
        startDate={this.state.startDate}
        onChange={this.handleChangeStart}
      />
      <DatePicker
        dateFormat="MMMM d, yyyy h:mm aa"
        selected={this.state.endDate}
        selectsEnd
        timeIntervals={15}
        showTimeSelect
        monthsShown={2}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onChange={this.handleChangeEnd}
      />
      </Container>
      <Form.Input placeholder="Title" id="createnotetitle"/>
      <Form.TextArea id="createnotedescription" style={{ height: "180px"}} />
      <TagSelect tags={[]} handleChangeOfTags={this.handleChangeOfTags} />
      <Select
      theme={(theme) => ({
      ...theme,
      colors: {
      ...theme.colors,
        primary25: '#cbeded',
        primary: '#cbeded'
        },
      })}
        placeholder="Select a Priority Level"
          onChange={this.handleChangeOfPriorityLevel}
          defaultValue={this.props.priority === undefined ? {label: "Low", value: "Low"} : {value: this.props.priority, label: this.props.priority}}
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          name="color"
          styles={{placeholder: styles => ({ ...styles, ...dot() }),singleValue: (styles, { data }) => { return {...styles, ...dot(data.value === 'High' ? 'red': data.value === 'Medium' ? 'orange' : '#e6e600')}}}}
          options={[{label:"Low",value:"Low"},{label:"Medium",value:"Medium"},{label:"High",value:"High"}]}
              />
      <Button floated="right" style={{marginTop: '1rem'}} type="submit" labelPosition='right' content='Save'/>
      </Form>
      </div>
    )
    }
  }


  const mapDispatchToProps = dispatch => {
    return {
      //props: dispatch process function ()=> {dispatch({type:,payload:})}
      creatingEvent: (start, end, title, description, priority, categoryHashArray)=>{dispatch(creatingEvent(start, end, title, description, priority, categoryHashArray))},

    }
  }

  export default connect(null,mapDispatchToProps)(CreateEvent)
