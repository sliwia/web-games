import React from 'react';
import { Slider, Radio, InputNumber, Button } from 'antd';
import './Settings.css';
import lang from '../files/lang.json';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      speedValue: 0
    }
    if (!localStorage.getItem('gameSpeed')) {
      localStorage.setItem('gameSpeed', '30');
    }
  }

  resetHighScore(){
    localStorage.setItem("highScore", 0);
    localStorage.setItem('gameSpeed', 30);
    this.setState({ speedValue:30 });

  }

  handleChange = speedValue => {
    localStorage.setItem('gameSpeed', speedValue);
    this.setState({ speedValue });
  };


  render() {
    const speedValue  = this.state.speedValue;
    return (
      <div className="settings-container">
        <h1>Ustawiania gry - kółko krzyżyk</h1>
        <div>
            <h3>Wybierz liczbę graczy</h3>
            <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a">1</Radio.Button>
                <Radio.Button value="b">2</Radio.Button>
            </Radio.Group>
        </div>
        <br></br>
        <h1>Ustawiania gry - piłka</h1>
        <div>
            <h3>{ lang[localStorage.getItem('lang')].speedGameTitle }</h3>
                <div className="icon-wrapper">
                <Slider onChange={this.handleChange} value={localStorage.getItem('gameSpeed')} />
            </div> 
            <div>
                <span>Zwycięstwo po rundzie numer: </span>
                <InputNumber min={1} max={10} defaultValue={100} />
            </div>  
        </div>
        <br></br>
        <Button onClick={this.resetHighScore.bind(this)} type="primary">{ lang[localStorage.getItem('lang')].defaultSettingsButton }</Button>
      </div>
    );
  } 
}

export default Settings;
