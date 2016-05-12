import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'

import './index.scss'

import loadLocation from './serv/location-loader'
import loadWeather from './serv/weather-loader'

import Currently from './layout/currently'
import Settings from './layout/settings'

ReactDom.render(<Settings />, document.getElementById('settings'))

loadWeather(loadLocation())
  .then(function (weather) {
    ReactDom.render(<Currently weather={weather} />, document.getElementById('currently'))
  })