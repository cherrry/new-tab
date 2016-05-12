import styles from './stub.scss'

import React from 'react'
import CSSModules from 'react-css-modules'

class Stub extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="icon-block" />
        <div styleName="temp">.</div>
        <div styleName="now">.</div>
      </div>
    )
  }
}

export default CSSModules(Stub, styles)
