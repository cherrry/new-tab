import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import Bounce from 'bounce.js'

import styles from './forecast.scss'

let weekday = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

class Forecast extends React.Component {
  static get propTypes() {
    return {
      dayOffset: React.PropTypes.number.isRequired,
      minTemp: React.PropTypes.number.isRequired,
      maxTemp: React.PropTypes.number.isRequired,
      icon: React.PropTypes.string
    }
  }

  componentDidMount() {
    let elem = ReactDom.findDOMNode(this)
    let delay = this.props.dayOffset
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
    let dt = new Date((+new Date()) + this.props.dayOffset * 86400 * 1000)
    return (
      <div styleName="container">
        <span style={{height: 100, width: 100, backgroundColor: '#aaa', display: 'inline-block'}}></span>
        <div>
          <span styleName="min-temp">{this.props.minTemp}</span>
          <span styleName="max-temp">{this.props.maxTemp}</span>
        </div>
        <div styleName="weekday">{weekday[dt.getDay()]}</div>
      </div>
    )
  }
}

export default CSSModules(Forecast, styles)
