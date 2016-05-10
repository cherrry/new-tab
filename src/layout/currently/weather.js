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
        <Today temp={today.temp} icon={today.icon} />
        {Object.keys(forecast).sort().map(function (date, idx) {
          let data = forecast[date]
          return <Forecast
            key={date}
            dayOffset={idx+1}
            minTemp={data.minTemp}
            maxTemp={data.maxTemp}
            icon={data.icon}
          />
        })}
      </div>
    )
  }
}

export default CSSModules(Weather, styles)
