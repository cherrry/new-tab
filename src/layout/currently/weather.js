import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './weather.scss'

import Today from './weather/today'
import Forecast from './weather/forecast'

class Weather extends React.Component {
  render() {
    let { today, forecast } = this.props

    return (
      <div {...this.props} styleName="container">
        <Today data={today} />
        {Object.keys(forecast).sort().map(function (date, idx) {
          let data = forecast[date]
          return <Forecast
            key={date}
            dayOffset={idx+1}
            data={data}
          />
        })}
      </div>
    )
  }
}

export default CSSModules(Weather, styles)
