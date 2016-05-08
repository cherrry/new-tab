import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './datetime.scss'

import TimeFormat from './datetime/time-format'

class Datetime extends React.Component {
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
