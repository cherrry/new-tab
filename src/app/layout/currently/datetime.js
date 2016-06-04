import styles from './datetime.scss'

import React from 'react'
import CSSModules from 'react-css-modules'

import { sprintf } from 'sprintf-js'

import TimeFormat from './datetime/time-format'

let timeFormat = function (dt) {
  return sprintf("%02d %02d %02d", dt.getHours(), dt.getMinutes(), dt.getSeconds())
}

let monthText = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

let ordinal = function (n) {
  let mod10 = n % 10;
  let mod100 = n % 100;

  if (mod10 == 1 && mod100 !== 11) {
    return 'st'
  }
  if (mod10 == 2 && mod100 !== 12) {
    return 'nd'
  }
  if (mod10 == 3 && mod100 !== 13) {
    return 'rd'
  }
  return 'th'
}

let dateFormat = function (dt) {
  let date = dt.getDate()
  return sprintf("%d%s %s, %d", date, ordinal(date), monthText[dt.getMonth()], dt.getFullYear())
}

class Datetime extends React.Component {
  render() {
    return (
      <div {...this.props} styleName="container">
        <TimeFormat styleName="time" formatter={timeFormat} />
        <TimeFormat styleName="date" formatter={dateFormat} />
      </div>
    )
  }
}

export default CSSModules(Datetime, styles)
