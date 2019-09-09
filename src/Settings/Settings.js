import React from 'react';
import { Slider, Radio, InputNumber, Button } from 'antd';
import './Settings.css';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      speedValue: 0
    }
  }

  resetHighScore(){
    localStorage.setItem("highScore", 0);
  }

  handleChange = speedValue => {
    this.setState({ speedValue });
  };

  

  render() {
    const speedValue  = this.state.speedValue;
    return (
      <div className="settings-container">
        <h1>Ustawiania ogólne</h1>
        <div>
            <h3>Wybierz język platformy</h3>
            <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a">Polski</Radio.Button>
                <Radio.Button value="b">Angielski</Radio.Button>
            </Radio.Group>
        </div>
        <br></br>
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
            <h3>Prędkość piłki</h3>
                <div className="icon-wrapper">
                <Slider onChange={this.handleChange} value={speedValue} />
            </div> 
            <div>
                <span>Zwycięstwo po rundzie numer: </span>
                <InputNumber min={1} max={10} defaultValue={10} />
            </div>  
        </div>
        <br></br>
        <Button onClick={this.resetHighScore.bind(this)} type="primary">Zresetuj zapisany najlepszy wynik</Button>
      </div>
    );
  } 
}

export default Settings;
