import React, { Component, PropTypes } from 'react'
import {bindActionCreators } from 'redux'
import { todoActions } from '../redux/actions'
import { connect } from 'react-redux'

const mixProps = (style, props) => {
  const divStyle = {};

  if (props.row) {
    divStyle.flexDirection = 'row';
  } else if (props.column) {
    divStyle.flexDirection = 'column';
  }

  if (typeof props.width === 'number') {
    divStyle.flexGrow = props.width;
  } else if (props.width) {
    divStyle.flexBasis = 'auto';
    divStyle.flexGrow = 0;
    divStyle.flexShrink = 0;
    divStyle.width = props.width;
  }

  if (props.height) {
    divStyle.flexBasis = 'auto';
    divStyle.flexGrow = 0;
    divStyle.flexShrink = 0;
    divStyle.height = props.height;
  }

  if (props.style) {
    return {...flexStyle, ...style, ...divStyle, ...props.style};
  } else {
    return {...flexStyle, ...style, ...divStyle};
  }
}

const flexStyle = {
  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'nowrap',
  flex: '1 0 auto',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  alignItems: 'stretch'
};

class View extends Component {


  render() {
    const style = mixProps({}, this.props);
    if (this.props.auto) {
      style.flex = '0 0 auto';
    }

    // strip props that are invalid to set on a div.
    // (prevents https://fb.me/react-unknown-prop)
    let {
      row, column, auto,
      ...divProps
    } = this.props;

    return <div {...divProps} style={style}>{this.props.children}</div>;
  }
}

const mapStateToProps = state => {
  return {
    //props: state.something
    todos: state.todos
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //props: dispatch process function ()=> {dispatch({type:,payload:})}
    todosActions: bindActionCreators(todoActions, dispatch)

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(View)
