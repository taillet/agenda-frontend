import React, { Component } from 'react'

class SvgButton extends Component {
  render() {
    const style = {
      container: {
        cursor: 'pointer'
      },
      inner: {
        fill: this.props.priority === 'High' ? '#FF9999': this.props.priority === 'Medium' ? '#ffc966' : '#ffff99',
        stroke: 'currentColor',
        strokeWidth: '3',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }
    }

    return (
      <svg style={style.container} height="1.5em" width="1.5em" viewBox="0 0 24 24">
        <g style={style.inner}>
          {this.props.children}
        </g>
      </svg>
    )
  }
}

export default SvgButton
