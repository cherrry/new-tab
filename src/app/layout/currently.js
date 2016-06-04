import styles from './currently.scss'

import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import CSSModules from 'react-css-modules'

import Datetime from './currently/datetime'
import Weather from './currently/weather'

class Currently extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="main">
          <CSSTransitionGroup component="div" transitionName={{
            appear: styles['datetime-appear'],
            appearActive: styles['datetime-appear-active']
          }} transitionAppearTimeout={0} transitionAppear={true} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
            <Datetime />
          </CSSTransitionGroup>
          <Weather />
        </div>
      </div>
    )
  }
}

export default CSSModules(Currently, styles)
