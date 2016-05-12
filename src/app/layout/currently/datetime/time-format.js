import React from 'react'

class TimeFormat extends React.Component {
  static get propTypes() {
    return {
      formatter: React.PropTypes.func.isRequired
    }
  }

  componentWillMount() {
    this.setState({ clock: true })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(function (state) {
        return {
          clock: !state.clock
        }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    let displayTime = this.props.formatter(new Date())
    return (
      <span {...this.props}>{displayTime}</span>
    )
  }
}

export default TimeFormat
