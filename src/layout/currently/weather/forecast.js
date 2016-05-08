import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import Bounce from 'bounce.js'

import styles from './forecast.scss'

class Forecast extends React.Component {
  static get propTypes() {
    return {
      delay: React.PropTypes.number.isRequired
    }
  }

  componentDidMount() {
    let elem = ReactDom.findDOMNode(this)
    let delay = this.props.delay
    new Bounce()
    .translate({
      from: { x: 0, y: 48 },
      to: { x: 0, y: 0 },
      duration: 2048 * Math.pow(1.18, delay)
    })
    .scale({
      from: { x: 0.2, y: 0.2 },
      to: { x: 1, y: 1 },
      duration: 2048 * Math.pow(1.15, delay)
    })
    .applyTo(elem, { remove: true })
  }

  render() {
    return (
      <div styleName="container">
        <span style={{height: 100, width: 100, backgroundColor: '#aaa', display: 'inline-block'}}></span>
        <div>
          <span styleName="min-temp">27</span>
          <span styleName="max-temp">31</span>
        </div>
        <div styleName="weekday">Monday</div>
      </div>
    )
  }
}

export default CSSModules(Forecast, styles)
