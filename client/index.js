import React from 'react'
import { render } from 'react-dom'

const timezones = () => fetch('/reactclock/times').then(res => res.json())

const times = areas =>
  areas.map(({ zone }) => ({
    zone: zone.split('/')[1].replace('_', ' '),
    time: moment()
      .tz(zone)
      .format('hh:mm:ssA')
  }))

const renders = time =>
  (($time, $value) => {
    $time.classList.add('time')
    $value.textContent = `${time.zone} ${time.time}`
    $value.classList.add('value')
    return $time.appendChild($value).parentNode
  })(document.createElement('div'), document.createElement('div'))

const tick = () => {
  const zones = timezones()
  setInterval(() => {
    zones
      .then(times)
      .then(data => data.map(renders))
      .then(data => {
        document.querySelector('#times').innerHTML = ''
        data.forEach(element => {
          document.querySelector('#times').appendChild(element)
        })
      })
  }, 16)
}

tick()
// class Clock extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { date: new Date() }
//   }
//   componentDidMount() {
//     this.timerID = setInterval(() => this.tick(), 1000)
//   }
//   tick() {
//     this.setState({
//       date: new Date()
//     })
//   }
//   render() {
//     return (
//       <div>
//         <h2>{this.state.date.toLocaleTimeString()}</h2>
//       </div>
//     )
//   }
// }
//
// render(<Clock />, document.querySelector('#times'))
