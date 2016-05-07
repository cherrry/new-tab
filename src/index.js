import React from 'react'
import ReactDom from 'react-dom'

class Index extends React.Component {
  render() {
    return <h1>It sucks</h1>
  }
}

let mountPoint = document.getElementById('mount-point')

ReactDom.render(<Index />, mountPoint)
