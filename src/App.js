import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Menu, Icon, Radio, Tooltip} from 'antd'
import 'antd/dist/antd.css';
import './App.css';
import HomePage from './HomePage/HomePage';
import TicTacToe from './TicTacToe/TicTacToe';
import PaddleGame from './PaddleGame/PaddleGame'
import Settings from './Settings/Settings';

import lang from '../src/files/lang.json';
import PaperScissorsRock from './PaperScissorsRock/PaperScissorsRock';


class App extends React.Component {
  constructor() {
    super();

    let langs = [
      'en',
      'pl'
    ]
    
    if (!localStorage.getItem('lang') || 
      typeof localStorage.getItem('lang') !== 'string' ||
      langs.indexOf(localStorage.getItem('lang') ===-1)) {
        localStorage.setItem('lang', 'en');
      }

    this.state = {
      lang: null
    }
  }

  setLang(lang) {
    localStorage.setItem('lang', lang);
    this.setState({lang});
  }

  render() {
    let defaultValue = localStorage.getItem('lang')
    const iconsStyle = { fontSize: '20px'}
    return (
      <>
      <Router>
        <div className="container-menu"> 
          <Menu mode="horizontal" className="menu-main-view">
            <Menu.Item>
              <Link to="/">
                <Icon type="home" style={iconsStyle} />
                {lang[localStorage.getItem('lang')].menuHome}
              </Link>
            </Menu.Item>  
            <Menu.Item>
              <Link to="/tictactoe">
              <Icon type="number" style={iconsStyle} />
                {lang[localStorage.getItem('lang')].menuTicTacToe}
              </Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/paddlegame">
                <Icon type="dribbble" style={iconsStyle} />
                {lang[localStorage.getItem('lang')].menuPaddleGame}
              </Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/paperscissorsrock">
                <Icon type="scissor" style={iconsStyle} />
                {lang[localStorage.getItem('lang')].menuPaperScissorsRock}
              </Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/settings">
                <Icon type="setting" style={iconsStyle} />
                {lang[localStorage.getItem('lang')].menuSettings}
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          
        </div>
        <Route path="/" exact component={ HomePage } />
        <Route path="/tictactoe" component={ TicTacToe } />
        <Route path="/paddlegame" component={ PaddleGame } />
        <Route path="/paperscissorsrock" component={ PaperScissorsRock } />
        <Route path="/settings" component={ Settings } />
      </Router>

      <Tooltip placement="top" title={lang[localStorage.getItem('lang')].languageTooltip}>
        <div className="lang-radio-group">
          <Radio.Group defaultValue={defaultValue} size="small">
                <Radio.Button value="pl" onClick={this.setLang.bind(this, 'pl')}>PL</Radio.Button>
                <Radio.Button value="en" onClick={this.setLang.bind(this, 'en')}>EN</Radio.Button>
          </Radio.Group>
        </div>
      </Tooltip>
      </>
    );
  }
}


export default App;
