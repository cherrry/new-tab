import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import Bounce from 'bounce.js'

import styles from './datetime.scss'

import TimeFormat from './datetime/time-format'

class Datetime extends React.Component {
  componentDidMount() {
    let elem = ReactDom.findDOMNode(this)
    new Bounce()
      .translate({
        from: { x: 0, y: -128 },
        to: { x: 0, y: 0 },
        duration: 3072
      })
      .applyTo(elem)
  }

  render() {
    return (
      <div>
        <TimeFormat styleName="time" format="HH mm ss" />
        <TimeFormat styleName="date" format="Do MMMM, YYYY" />
      </div>
    )
  }
}

export default CSSModules(Datetime, styles)
