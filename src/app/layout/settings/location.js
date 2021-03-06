import 'icon'

import React from 'react'
import ReactDom from 'react-dom'
import Bounce from 'bounce.js'

class Location extends React.Component {
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
        duration: 2048
      })
      .applyTo(elem, { remove: true })
  }

  render() {
    return (
      <li {...this.props}><i className="icon-location" /></li>
    )
  }
}

export default Location
