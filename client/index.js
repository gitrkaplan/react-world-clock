/* global fetch */

import React, { Component } from 'react'
import { render } from 'react-dom'
var moment = require('moment-timezone')

class Clocks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timezones: [{ zone: 'America/Los_Angeles' }]
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  tick() {
    fetch('/reactclock/times')
      .then(res => res.json())
      .then(timezones => this.setState({ timezones }))
  }

  render() {
    return (
      <div>
        {this.state.timezones.map(({ zone }, index) => (
          <div className="time" key={index}>
            <div className="value">
              {zone.split('/')[1].replace('_', ' ')}
              <br />
              {moment()
                .tz(zone)
                .format('hh:mm:ssA')}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

render(<Clocks />, document.querySelector('#times'))
