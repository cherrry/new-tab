import styles from './settings.scss'

import React from 'react'
import CSSModules from 'react-css-modules'

import Location from './settings/location'
import Refresh from './settings/refresh'

class Settings extends React.Component {
  constructor() {
    super()
    this.state = {
      isActive: false
    }
  }

  toggleActive() {
    this.setState(function (state) {
      return {
        isActive: !state.isActive
      }
    })
  }

  render() {
    return (
      <div {...this.props} styleName="container">
        <ul styleName="menu-items">
          <Location />
          <Refresh />
        </ul>
      </div>
    )
  }
}

export default CSSModules(Settings, styles)
