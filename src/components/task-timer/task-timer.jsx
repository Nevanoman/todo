import { Component } from 'react'

export default class Timer extends Component {
  state = {
    timer: 0,
    isTimerStarted: false,
  }

  componentDidMount() {
    const { timer } = this.props
    this.setState({
      timer,
      isTimerStarted: false,
    })
  }

  startTimer = () => {
    const { isTimerStarted, timer } = this.state
    if (!isTimerStarted && timer >= 0) {
      this.timerID = setInterval(() => {
        this.setState((prevState) => ({ timer: Math.max(prevState.timer - 1, 0) }))
        if (this.timer === 0) {
          this.stopTimer()
        }
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
