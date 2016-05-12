import styles from './currently.scss'

import React from 'react'
import CSSModules from 'react-css-modules'

import Datetime from './currently/datetime'
import Weather from './currently/weather'

class Currently extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="main">
          <Datetime />
          <Weather />
        </div>
      </div>
    )
  }
}

export default CSSModules(Currently, styles)
