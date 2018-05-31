import React, { PureComponent } from 'react';
import './App.css';


class Clock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      days : 0,
      hours : 0,
      minutes : 0,
      seconds : 0 
    };
  }

  _getTimeUntil = () => {
    var seconds = parseInt(this.props.birthdayToSeconds && this.props.birthdayToSeconds > Date.now() / 1000 ?
       this.props.birthdayToSeconds - Date.now() / 1000 :
        0, 10);
    var days = Math.floor(seconds / (3600*24));
    seconds  -= days * 3600 * 24;
    var hours = Math.floor(seconds / 3600);
    seconds  -= hours * 3600;
    var minutes = Math.floor(seconds / 60);
    seconds  -= minutes * 60;
    this.setState({days, hours, minutes, seconds});
  }

  componentWillMount = () => {
    this.interval = setInterval(this._getTimeUntil, 1000);
  }

  _lead0 = (num) => {
    return num < 10 ? "0" + num : num;
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };


  render() {
    return (
      <h4 className="text-white countdown-app__text-info">
        <span className="countdown-app__time-span">{this._lead0(this.state.days)} Day(s)</span>  
        <span className="countdown-app__time-span">{this._lead0(this.state.hours)} Hour(s)</span>  
        <span className="countdown-app__time-span">{this._lead0(this.state.minutes)} Minute(s)</span>
        <span className="countdown-app__time-span">{this._lead0(this.state.seconds)} Second(s)</span>
      </h4>
    );
  }
}

export default Clock;