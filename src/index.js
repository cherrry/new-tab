import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'

import './index.scss'

import Currently from './layout/currently'
import Settings from './layout/settings'

ReactDom.render(<Currently />, document.getElementById('currently'))
ReactDom.render(<Settings />, document.getElementById('settings'))
