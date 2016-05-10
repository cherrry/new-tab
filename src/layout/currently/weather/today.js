import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import Bounce from 'bounce.js'

import styles from './today.scss'

class Today extends React.Component {
  static get propTypes() {
    return {
      temp: React.PropTypes.number.isRequired,
      icon: React.PropTypes.string
    }
  }

  componentDidMount() {
    let elem = ReactDom.findDOMNode(this)
    new Bounce()
      .translate({
        from: { x: 0, y: 32 },
        to: { x: 0, y: 0 },
        duration: 2048
      })
      .scale({
        from: { x: 0.25, y: 0.25 },
        to: { x: 1, y: 1 },
        duration: 2048
      })
      .applyTo(elem, { remove: true })
  }

  render() {
    return (
      <div styleName="container">
        <span style={{height: 150, width: 150, backgroundColor: '#aaa', display: 'inline-block'}} />
        <div styleName="temp">{this.props.temp}</div>
        <div styleName="now">Now</div>
      </div>
    )
  }
}

export default CSSModules(Today, styles)
