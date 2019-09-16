import React from 'react';
import { Slider, Radio, Button } from 'antd';
import './Settings.css';
import lang from '../files/lang.json';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      speedValue: 0,
      numberOfPlayers: 'onePlayer'
    }

    if (!localStorage.getItem('gameSpeed')) {
      localStorage.setItem('gameSpeed', '30');
    }

    if (!localStorage.getItem('numberOfPlayers')) {
      localStorage.setItem('numberOfPlayers', 'onePlayer');
    }
  }

  setDefaultSettings(){
    localStorage.setItem("highScore", 0);
    localStorage.setItem('gameSpeed', 30);
    //localStorage.setItem('numberOfPlayers', 'onePlayer')
    this.setState({ 
      speedValue:30,
      //numberOfPlayers: 'onePlayer'
    });

  }

  handleChangeSpeed = speedValue => {
    localStorage.setItem('gameSpeed', speedValue);
    this.setState({ speedValue });
  };

  handleChangePlayers  = checkedRadio => {
    localStorage.setItem('numberOfPlayers', checkedRadio.target.value);
    this.setState({numberOfPlayers: checkedRadio.target.value}) 
  };


  render() {
    let defaultValue = localStorage.getItem('numberOfPlayers')
    return (
      <div className="container settings-container">
        <div className="settings-frame">
          <h1>{ lang[localStorage.getItem('lang')].settingsTicTacToeTitle }</h1>
          <div>
              <h3>{ lang[localStorage.getItem('lang')].numberOfPlayersTitle }</h3>
              <Radio.Group onChange={ this.handleChangePlayers } defaultValue={defaultValue} size="large">
                  <Radio.Button value="onePlayer">1</Radio.Button>
                  <Radio.Button value="twoPlayers">2</Radio.Button>
              </Radio.Group>
          </div>
        </div>
        <div className="settings-frame">
          <h1>{ lang[localStorage.getItem('lang')].settingsPaddleGameTitle }</h1>
          <div>
              <h3>{ lang[localStorage.getItem('lang')].speedGameTitle }</h3>
                  <div className="icon-wrapper">
                  <Slider onChange={this.handleChangeSpeed} value={localStorage.getItem('gameSpeed')} />
              </div> 
          </div>
        </div>
        <Button onClick={this.setDefaultSettings.bind(this)} type="primary">{ lang[localStorage.getItem('lang')].defaultSettingsButton }</Button>
        
      </div>
    );
  } 
}

export default Settings;
