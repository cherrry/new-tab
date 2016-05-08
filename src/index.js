import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'

import Currently from './layout/currently'

let mountPoint = document.getElementById('mount-point')
ReactDom.render(<Currently />, mountPoint)
