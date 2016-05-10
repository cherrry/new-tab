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
      data: React.PropTypes.object.isRequired
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
    let { data } = this.props
    let dt = new Date((+new Date()) + this.props.dayOffset * 86400 * 1000)
    let props = {}
    if (data.icon) {
      props.className = `${data.location}_${data.icon}`
    }
    return (
      <div styleName="container">
        <div styleName="icon-block" {...props} />
        <div>
          <span styleName="min-temp">{data.minTemp}</span>
          <span styleName="max-temp">{data.maxTemp}</span>
        </div>
        <div styleName="weekday">{weekday[dt.getDay()]}</div>
      </div>
    )
  }
}

export default CSSModules(Forecast, styles)
