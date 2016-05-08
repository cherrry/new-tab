import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './currently.scss'

class Currently extends React.Component {
  render() {
    return (
      <div>
        <h1 styleName="title">It sucks</h1>
      </div>
    )
  }
}

export default CSSModules(Currently, styles)
