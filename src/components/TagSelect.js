import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import {connect} from 'react-redux'
import { fetchingCategories } from '../redux/actions'

class CreatableMulti extends Component {
  constructor(props) {
    super(props)
    this.state = {categories: []}
    console.log("tags",this.props)
  }

  componentDidMount() {
    this.props.fetchingCategories();
  }

  render() {
    console.log("categories",this.props.categories.map(category=>[category.name,category.id]))
    return (
      <CreatableSelect
        isMulti
        theme={(theme) => ({
        ...theme,
        colors: {
        ...theme.colors,
          primary25: '#cbeded',
          primary: '#cbeded'
        },
      })}
        placeholder="Select a Category"
        defaultValue={this.props.tags.map(category=> {return {label: category.name, value: category.id}})}
        closeMenuOnSelect={false}
        onChange={this.props.handleChangeOfTags}
        options={this.props.categories.map(category=> {return {label: category.name, value: category.id}})}
        styles={{multiValue: (styles, { data }) => { return {...styles, backgroundColor: 'rgb(224,255,255)'};}}}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
  //  fetchingNotes: ()=>{dispatch(fetchingNotes())},
    fetchingCategories: ()=>{dispatch(fetchingCategories())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatableMulti);
