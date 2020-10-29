import React, { PureComponent } from 'react';
import './App.css';
import Clock from './Clock.js';
import Stopwatch from './Stopwatch.js'

const SCREEN_STATE = {
  countdown : "countdown",
  stopwatch : "stopwatch"
}

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      birthday : "February 03, 2021",
      birthdayToSeconds : 0,
      screen : SCREEN_STATE.countdown
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

  componentDidMount = () => {
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
      <div className="container-fluid full-height main-bg">
        { screen === SCREEN_STATE.countdown ? 
          ( 
            <div className="row full-height vertical-center text-center">
              <div className="col-xs-12">
                <h3 className="text-white countdown-app__text-info">Countdown to your birthday : {this.state.birthday}</h3>
                <Clock birthdayToSeconds={this.state.birthdayToSeconds} />
                <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                  <form onSubmit={this._handleSubmit}>
                    <input type="text" className="form-control" onChange={this._handleChange} value={this.state.birthday}></input>
                    <div className="countdown-app__helper-div" data-toggle="tooltip" title="Date format : May 25 2018 or 25 May 2018">
                      <span className="glyphicon glyphicon-question-sign"></span>
                    </div>
                    <div className="countdown-app__button-container">
                      <button type="submit" className="btn btn-success countdown-app__button-submit">
                        <i className="fas fa-birthday-cake"></i>
                        <span>Change birthday!</span>
                      </button>
                      <button type="button" className="btn btn-danger countdown-app__button-submit" onClick={() => this._changeScreen(SCREEN_STATE.stopwatch)}>
                        <i className="fas fa-stopwatch"></i>
                        <span>Try stopwatch!</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div> 
            </div>)
          : (<Stopwatch  onChangeScreen={() => this._changeScreen(SCREEN_STATE.countdown)}/>)
        }
      </div>
    )
  } 
}

export default App;