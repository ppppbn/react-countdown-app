import React, { PureComponent } from 'react';

const STOPWATCHSTATE = {
  started : "started",
  paused : "paused",
  default : "default"
}

class Stopwatch extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { 
        time : 0,
        hours : 0,
        minutes : 0,
        seconds : 0,
        started : STOPWATCHSTATE.default,
        showNoti : false
      };
    }

    _handleChangeHour = (event) => {      
      this.setState({
        hours : Number(event.target.value),
        showNoti : false
      })
    }
    _handleChangeMinute = (event) => {
      this.setState({
        minutes : Number(event.target.value),
        showNoti : false
      })
    }
    _handleChangeSecond = (event) => {
      this.setState({
        seconds : Number(event.target.value),
        showNoti : false
      })
    }

    _lead0 = (num, isHour) => {
      num = Number(num);
      return num < 10 ? "0" + num : (num >= 59 ? (isHour ? (num >= 100 ? 99 : num) : 59) : num);
    }

    _handleSubmit = (event) => {
      event.preventDefault();
      if(this.state.started === STOPWATCHSTATE.default){
        var time = Number(event.target[0].value) * 3600 + Number(event.target[1].value) * 60 + Number(event.target[2].value);
        var hours = Math.floor((time)/3600);
        var minutes = Math.floor((time - hours * 3600)/60);
        var seconds = Math.floor((time - hours * 3600 - minutes * 60));
        event.target[0].value = 0;
        event.target[1].value = 0;
        event.target[2].value = 0;
        this.setState({
          time : time,
          hours : hours,
          minutes : minutes,
          seconds : seconds
        }, this._start)
      }
      else if (this.state.started === STOPWATCHSTATE.paused){
        this._start();
      }
    }

    _stopwatch = () => {
      if(this.state.started === STOPWATCHSTATE.started){
        if(this.state.time > 0){
          var hours = Math.floor((this.state.time - 1)/3600);
          var minutes = Math.floor((this.state.time - 1 - hours * 3600)/60);
          var seconds = Math.floor((this.state.time - 1 -hours * 3600 - minutes * 60));
          this.setState({
            time : this.state.time - 1,
            hours : hours,
            minutes : minutes,
            seconds : seconds
          })
        }
        else {
          this._reset();
          this.setState({
            showNoti : true
          })
        }
      }
      else return;
    }

    _reset = () => {
      this.setState({
        time : 0,
        hours : 0,
        minutes : 0,
        seconds : 0,
        started : STOPWATCHSTATE.default,
        showNoti : false
      }, () => {
        clearInterval(this.interval);
      })
    }

    _pause = () => {      
      this.setState({
        started : STOPWATCHSTATE.paused
      }, () => {
        clearInterval(this.interval);
      })
    }

    _start = () => {
      if(this.state.started !== STOPWATCHSTATE.started){
        this.interval = setInterval(this._stopwatch, 1000);
        this.setState({
          started : STOPWATCHSTATE.started,
          showNoti : false
        })
      }
      else return;
    }

    componentWillUnmount = () => {
      this._reset();
    }

    render() {
        const started = this.state.started;
        const hours = this._lead0(this.state.hours, true).toString();
        const minutes = this._lead0(this.state.minutes).toString();
        const seconds = this._lead0(this.state.seconds).toString();
        return (
          <div className="row full-height vertical-center text-center">
            <div className="col-xs-12">
              <h2 className="text-white countdown-app__text-info">Stopwatch</h2>
              {this.state.showNoti ? (<h3 className="text-white">Time's up</h3>) : ""}
              <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                <form onSubmit={this._handleSubmit}>
                  <input type="number" className="stopwatch__input" onChange={this._handleChangeHour} value={hours}></input>
                  <span className="stopwatch__separated-colon">:</span>
                  <input type="number" className="stopwatch__input" onChange={this._handleChangeMinute} value={minutes}></input>
                  <span className="stopwatch__separated-colon">:</span>
                  <input type="number" className="stopwatch__input" onChange={this._handleChangeSecond} value={seconds}></input>
                  <div className="countdown-app__button-container">
                  {
                    started !== STOPWATCHSTATE.started ? 
                    (
                      <button type="submit" className="btn btn-success countdown-app__button-nav">
                        <i className="fas fa-play"></i>
                        <span>{this.state.time ? 'Resume!' : 'Start!'}</span>
                      </button>
                    ) :
                    (
                      <a className="btn btn-warning countdown-app__button-nav" onClick={() => this._pause()}>
                        <i className="fas fa-pause"></i>
                        <span>Pause!</span>
                      </a>
                    )
                  } 
                    <a className="btn btn-danger countdown-app__button-nav" onClick={this._reset}>
                      <i className="fas fa-redo"></i>
                      <span>Reset!</span>
                    </a>
                    <a className="btn btn-info countdown-app__button-nav" onClick={this.props._changeScreen}>
                      <i className="fas fa-home"></i>
                      <span>Home</span>
                    </a>
                  </div>
                </form>
              </div>
            </div> 
          </div>
        );
    }
}

export default Stopwatch;