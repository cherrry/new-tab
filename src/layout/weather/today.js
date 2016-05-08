import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './today.scss'

class Today extends React.Component {
  render() {
    return (
      <div styleName="container">
        <span style={{height: 150, width: 150, backgroundColor: '#aaa', display: 'inline-block'}}></span>
        <div styleName="temp">29</div>
        <div styleName="now">Now</div>
      </div>
    )
  }
}

export default CSSModules(Today, styles)
