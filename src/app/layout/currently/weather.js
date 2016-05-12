import styles from './weather.scss'

import React from 'react'
import CSSModules from 'react-css-modules'

import { WeatherActions, WeatherStore } from 'app/store/weather'

import Stub from './weather/stub'
import Today from './weather/today'
import Forecast from './weather/forecast'

let stub = <Stub />

class Weather extends React.Component {
  constructor() {
    super()
    this.state = null
  }

  componentDidMount() {
    WeatherStore.subscribe(this.updateDisplay)
    WeatherActions.refresh()
  }

  componentWillUnmount() {
    WeatherStore.unsubscribe(this.updateDisplay)
  }

  updateDisplay = (state) => {
    this.setState(state.weather)
  }

  render() {
    let content = stub

    if (this.state) {
      let { today, forecast } = this.state
      content = [
        <Today key="today" data={today} />
      ].concat(
        forecast.map(function (data, idx) {
          return <Forecast key={idx} dayOffset={idx+1} data={data} />
        })
      )
    }

    return <div styleName="container">{content}</div>
  }
}

export default CSSModules(Weather, styles)
