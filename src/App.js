import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Menu, Icon} from 'antd'
import 'antd/dist/antd.css';
import './App.css';
import HomePage from './HomePage/HomePage';
import TicTacToe from './TicTacToe/TicTacToe';
import PaddleGame from './PaddleGame/PaddleGame'
import Settings from './Settings/Settings';



class App extends React.Component {
  render() {
    return (
      <>
      <Router>
        <div className="container-menu"> 
          <Menu mode="horizontal" className="menu-main-view">
            <Menu.Item>
              <Link to="/">
                <Icon type="home" />
                Strona główna
              </Link>
            </Menu.Item>  
            <Menu.Item>
              <Link to="/tictactoe">
                <Icon type="table" />
                Gra - kółko krzyżyk
              </Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/paddlegame">
                <Icon type="dribbble" />
                Gra - Piłka
              </Link>
            </Menu.Item>
            <Menu.Item >
              <Link to="/settings">
                <Icon type="setting" />
                Ustawienia
              </Link>
            </Menu.Item>
          </Menu>
        </div>

        
        <Route path="/" exact component={ HomePage } />
        <Route path="/tictactoe" component={ TicTacToe } />
        <Route path="/paddlegame" component={ PaddleGame } />
        <Route path="/settings" component={ Settings } />

      </Router>
      </>
    );
  }
  
}

export default App;
