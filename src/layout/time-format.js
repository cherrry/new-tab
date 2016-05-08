import React from 'react'
import moment from 'moment'

let getDisplayTime = function (timeFormat) {
  return {
    displayTime: moment().format(timeFormat)
  }
}

class TimeFormat extends React.Component {
  static get propTypes() {
    return {
      format: React.PropTypes.string.isRequired
    }
  }

  componentWillMount() {
    this.setState(getDisplayTime(this.props.format))
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(getDisplayTime(this.props.format))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <span className={this.props.className}>{this.state.displayTime}</span>
    )
  }
}

export default TimeFormat
