import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './forecast.scss'

class Forecast extends React.Component {
  render() {
    return (
      <div styleName="container">
        <span style={{height: 100, width: 100, backgroundColor: '#aaa', display: 'inline-block'}}></span>
        <div>
          <span styleName="min-temp">27</span>
          <span styleName="max-temp">31</span>
        </div>
        <div styleName="weekday">Monday</div>
      </div>
    )
  }
}

export default CSSModules(Forecast, styles)
