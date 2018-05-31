import React, { Component } from 'react';
import './App.css';
import Clock from './Clock.js';
import Stopwatch from './Stopwatch.js'

const SCREEN_STATE = {
  countdown : "countdown",
  stopwatch : "stopwatch"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      birthday : "November 15, 2018",
      birthdayToSeconds : 0,
      screen : SCREEN_STATE.stopwatch
    };
  }

  _handleChange = (event) => {
    this.setState({birthday: event.target.value});
  };

  _handleSubmit = (e) => {
    this.setState({
      birthdayToSeconds : new Date(this.state.birthday).getTime() / 1000
    })
    e.preventDefault();
  };

  componentWillMount = () => {
    this.setState({
      birthdayToSeconds : new Date(this.state.birthday).getTime() / 1000
    }); 
  };

  _changeScreen = (screen) => {
    this.setState({screen});
  } 

  render() {
    const screen = this.state.screen;
    return (
      <div className="container-fluid full-height bg-primary">
        { screen === SCREEN_STATE.countdown ? 
          ( 
            <div className="row full-height vertical-center text-center">
              <div className="col-xs-12">
                <h3 className="text-white countdown-app__text-info">Countdown to your birthday : {this.state.birthday}</h3>
                <Clock birthdayToSeconds={this.state.birthdayToSeconds} />
                <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                  <form onSubmit={this._handleSubmit}>
                    <input type="text" className="form-control" onChange={this._handleChange} value={this.state.birthday}></input>
                    <div className="countdown-app__helper-div" data-toggle="tooltip" title="Date format : May 25 2018 or 25 May 2018">
                      <span className="glyphicon glyphicon-question-sign"></span>
                    </div>
                    <div className="countdown-app__button-container">
                      <button type="submit" className="btn btn-success countdown-app__button-submit">Change birthday!</button>
                      <button type="button" className="btn btn-danger countdown-app__button-submit" onClick={() => this._changeScreen('stopwatch')}>Try stopwatch!</button>
                    </div>
                  </form>
                </div>
              </div> 
            </div>)
          : (<Stopwatch  _changeScreen={() => this._changeScreen(SCREEN_STATE.countdown)}/>)
        }
      </div>
    )
  } 
}

export default App;