import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './weather.scss'

import Today from './weather/today'
import Forecast from './weather/forecast'

class Weather extends React.Component {
  render() {
    return (
      <div styleName="container">
        <Today />
        <Forecast />
        <Forecast />
        <Forecast />
        <Forecast />
      </div>
    )
  }
}

export default CSSModules(Weather, styles)
