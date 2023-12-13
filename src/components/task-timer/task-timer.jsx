import { Component } from 'react'

export default class Timer extends Component {
  state = {
    timer: '',
  }

  componentDidMount() {
    const { timer } = this.props
    this.setState({
      timer,
      isTimerStarted: false,
    })
  }

  formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  startTimer = () => {
    const { isTimerStarted } = this.state
    if (!isTimerStarted) {
      this.timerID = setInterval(() => {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }))
      }, 1000)

      this.setState({
        isTimerStarted: true,
      })
    }
  }

  stopTimer = () => {
    clearInterval(this.timerID)

    this.setState({
      isTimerStarted: false,
    })
  }

  render() {
    const { timer } = this.state
    const newTim = this.formatTime(timer)
    return (
      <span className="description">
        <button type="button" className="icon icon-play" aria-label="edit" onClick={this.startTimer} />
        <button type="button" className="icon icon-pause" aria-label="edit" onClick={this.stopTimer} />
        {newTim}
      </span>
    )
  }
}
