import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './currently.scss'

import Datetime from './currently/datetime'
import Weather from './currently/weather'

class Currently extends React.Component {
  render() {
    let { weather } = this.props

    return (
      <div {...this.props} styleName="container">
        <Datetime />
        <Weather today={weather.today} forecast={weather.forecast} />
      </div>
    )
  }
}

export default CSSModules(Currently, styles)
