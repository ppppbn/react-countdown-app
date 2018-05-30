import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      birthday : "November 15, 2018",
      birthdayToSeconds : 0,
      days : 0,
      hours : 0,
      minutes : 0,
      seconds : 0 
    };
  }

  handleChange = (event) => {
    this.setState({birthday: event.target.value});
  };

  handleSubmit = (e) => {
    this.setState({
      birthdayToSeconds : new Date(this.state.birthday).getTime() / 1000
    })
    e.preventDefault();
  };

  getTimeUntil = () => {
    var seconds = parseInt(this.state.birthdayToSeconds && this.state.birthdayToSeconds > Date.now() / 1000 ?
       this.state.birthdayToSeconds - Date.now() / 1000 :
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
    this.setState({
      birthdayToSeconds : new Date(this.state.birthday).getTime() / 1000
    }, () => {
      this.interval = setInterval(this.getTimeUntil, 1000);
    }) 
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <div className="container-fluid full-height bg-primary">
        <div className="row full-height vertical-center text-center">
          <div className="col-xs-12">
            <h3 className="text-white countdown-app__text-info">Countdown to your birthday : {this.state.birthday}</h3>
            <h4 className="text-white countdown-app__text-info">
              <span className="countdown-app__time-span">{this.state.days} Day(s)</span>  
              <span className="countdown-app__time-span">{this.state.hours} Hour(s)</span>  
              <span className="countdown-app__time-span">{this.state.minutes} Minute(s)</span>
              <span className="countdown-app__time-span">{this.state.seconds} Second(s)</span>
            </h4>
            <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
              <form onSubmit={this.handleSubmit}>
                <input type="text" className="form-control" onChange={this.handleChange} value={this.state.birthday}></input>
                <div className="countdown-app__helper-div" data-toggle="tooltip" title="Date format : May 25 2018 or 25 May 2018">
                  <span className="glyphicon glyphicon-question-sign"></span>
                </div>
                <button type="submit" className="btn btn-success countdown-app__button-submit">Change birthday!</button>
              </form>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;