import React from 'react'
import { TwitterPicker } from 'react-color'
import {connect} from 'react-redux'
import { deletingCategory, fetchingCategories, creatingCategory, editingCategoryColor } from '../redux/actions'
import CreatableSelect from 'react-select/lib/Creatable';
import { Container, Button } from 'semantic-ui-react'

class CategoryColorSelector extends React.Component {
  constructor() {
    super()
    this.state = {currentCategory: '', currentColor: '', currentCategoryName: ''}
  }

  deleteCategory = () => {
    let categoryToDelete = this.state.currentCategory
    this.props.deletingCategory(categoryToDelete)
    this.setState({currentCategory: '', currentColor: '', currentCategoryName: ''})
  }

  changeCategory = (cat) => {
    if (cat !== null && cat.__isNew__) {
      this.props.creatingCategory(cat.label)
      this.setState({currentCategory: cat.label, currentCategoryName: cat.label})
      this.setState({currentColor: '#ABB8C3'})

    } else if (cat === null) {
      this.setState({currentCategory: '', currentColor: '', currentCategoryName: ''})
    } else {
      let tags = this.props.categories
      let color = tags.find(c => c.id === cat.value).color
      this.setState({currentCategory: cat.value, currentColor: color, currentCategoryName: cat.label})
    }
  }

  changeColor = (color) => {
    let categoryId = this.state.currentCategory
    console.log("color? ", color.hex)
    console.log("what is current category", this.state.currentCategory )
    if (this.state.currentCategory !== '' && typeof(this.state.currentCategory) !== 'number') {
      categoryId = this.props.categories.find(cat=> cat.name === this.state.currentCategory).id
    }
    this.props.editingCategoryColor(categoryId, color.hex)
    this.setState({currentColor: color.hex})
  }

  render() {
    return (
      <>
      <Container style={{display: 'flex', alignItems: 'center', flexDirection: 'column', border: '1px solid rgb(212,212,213)', borderRadius: '10px', paddingTop: '3vh', paddingLeft: '1vw', paddingRight: '1vw', paddingBottom: '2vh', marginTop: '3vh'}} >
      <Container style={{width: '80%', marginBottom: '2vh'}}>
      <CreatableSelect
      theme={(theme) => ({
      ...theme,
      colors: {
      ...theme.colors,
        primary25: '#cbeded',
        primary: '#cbeded'
        },
      })}
        placeholder="Categories"
          onChange={this.changeCategory}
          isClearable={true}
          options={this.props.categories.map(cat=>{return {label: cat.name, value: cat.id}})}
          />
          </Container>
      <TwitterPicker color={this.state.currentColor} onChange={this.changeColor}/>
      <Container style={{marginBottom: '2vh'}} >
    {this.state.currentCategoryName !== "" ?
      <Button floated="center" style={{marginTop: '1rem', fontFamily: 'Montserrat', textTransform: 'uppercase'}} type="submit" labelPosition='right' onClick={this.deleteCategory} content={'Delete '+ this.state.currentCategoryName}/> : null}
      </Container>

      </Container>
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
    creatingCategory: (id)=>{dispatch(creatingCategory(id))},
    editingCategoryColor: (categoryid, color)=>{dispatch(editingCategoryColor(categoryid, color))},
    deletingCategory: (id)=>{dispatch(deletingCategory(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryColorSelector)
