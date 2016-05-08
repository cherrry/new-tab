import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import Bounce from 'bounce.js'

import styles from './today.scss'

class Today extends React.Component {
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
        <span style={{height: 150, width: 150, backgroundColor: '#aaa', display: 'inline-block'}}></span>
        <div styleName="temp">29</div>
        <div styleName="now">Now</div>
      </div>
    )
  }
}

export default CSSModules(Today, styles)
