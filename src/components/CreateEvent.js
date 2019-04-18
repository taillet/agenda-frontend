import React from 'react'
import { Button, Container, Form, Header} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import TagSelect from './TagSelect'
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

    this.state = {startDate: new Date(), endDate: new Date(), tags: [], priority: {label: 'Low', value: 'Low'}}
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

  clearStates = (form) => {
    form.querySelector('#createnotetitle').value = ""
    form.querySelector('#createnotedescription').value = ""
    this.setState({startDate: new Date(), endDate: new Date(), tags: [], priority: {label: 'Low', value: 'Low'}})
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
      <div style={{marginTop: '5vh', width: '29vw', marginRight: '1vw', marginLeft: '1vw'}}>
      <Form style={{border: '1px solid rgb(212,212,213)', borderRadius: '10px', paddingTop: '5vh', paddingLeft: '1vw', paddingRight: '1vw', paddingBottom: '8vh'}} onSubmit={(e)=>{this.handleSubmit(e.target); this.clearStates(e.target)}}>
      <Container style={{marginBottom: '4vh'}}>
      <Header as="h2" style={{fontFamily: 'Montserrat', textTransform: 'uppercase', fontWeight: 300}}>ADD EVENT</Header>
      </Container>
      <Container style={{marginBottom: '2vh', display: 'flex', alignContent: 'center', justifyContent: 'space-between'}}>
      <DatePicker
        withPortal="true"
        shouldCloseOnSelect="true"

        selected={this.state.startDate}
        selectsStart
        timeIntervals={15}
        dateFormat="MMM d, yyyy h:mm aa"
        showTimeSelect
        startDate={this.state.startDate}
        onChange={this.handleChangeStart}
      />
      <DatePicker
        withPortal="true"
        shouldCloseOnSelect="true"
        dateFormat="MMM d, yyyy h:mm aa"
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
      <Form.TextArea placeholder="Description" id="createnotedescription" style={{ height: "22vh"}} />
      <Container style={{display: 'flex', alignContent: 'center', justifyContent: 'space-between'}}>
      <Container style={{width: '13vw'}}>
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
          value={this.state.priority}
          className="basic-single"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          name="color"
          styles={{placeholder: styles => ({ ...styles, ...dot() }),singleValue: (styles, { data }) => { return {...styles, ...dot(data.value === 'High' ? 'red': data.value === 'Medium' ? 'orange' : '#e6e600')}}}}
          options={[{label:"Low",value:"Low"},{label:"Medium",value:"Medium"},{label:"High",value:"High"}]}
              />
      </Container>
      <Container style={{width: '13vw', marginBottom: '1.2vh'}}>
      <TagSelect tags={[]} handleChangeOfTags={this.handleChangeOfTags} />
      </Container>
      </Container >
      <Button floated="right" style={{marginTop: '1rem', fontFamily: 'Montserrat', textTransform: 'uppercase'}} type="submit" labelPosition='right' content='Save'/>
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
