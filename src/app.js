import 'app/app.scss'

import React from 'react'
import { render } from 'react-dom'

import Currently from 'app/layout/currently'
import Settings from 'app/layout/settings'

render(<Settings />, document.getElementById('settings'))
render(<Currently />, document.getElementById('currently'))
