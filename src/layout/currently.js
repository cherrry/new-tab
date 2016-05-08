import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './currently.scss'

import Datetime from './datetime'

class Currently extends React.Component {
  render() {
    return (
      <div styleName="container">
        <Datetime />
      </div>
    )
  }
}

export default CSSModules(Currently, styles)
