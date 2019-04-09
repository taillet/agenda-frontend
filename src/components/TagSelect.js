import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import {connect} from 'react-redux'
import { fetchingCategories } from '../redux/actions'

class CreatableMulti extends Component {
  constructor() {
    super()
    this.state = {categories: []}
  }

  componentDidMount() {
    this.props.fetchingCategories();
  }

  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  render() {
    console.log("categories",this.props.categories.map(category=>[category.name,category.id]))
    return (
      <CreatableSelect
        isMulti
        placeholder="Select a Category"
        closeMenuOnSelect={false}
        onChange={this.handleChange}
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
