import 'icon'

import React from 'react'
import ReactDom from 'react-dom'
import Bounce from 'bounce.js'

import { WeatherActions } from 'app/store/weather'

class Refresh extends React.Component {
  componentDidMount() {
    let elem = ReactDom.findDOMNode(this)
    new Bounce()
      .scale({
        from: { x: .75, y: .75 },
        to: { x: 1, y: 1 },
        duration: 2048
      })
      .translate({
        from: { x: 0, y: 24 },
        to: { x: 0, y: 0 },
        duration: 3072
      })
      .applyTo(elem, { remove: true })
  }

  refresh = () => {
    WeatherActions.refresh()
  }

  render() {
    return (
      <li {...this.props}><i className="icon-refresh" onClick={this.refresh} /></li>
    )
  }
}

export default Refresh
