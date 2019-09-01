import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Menu, Icon} from 'antd'
import 'antd/dist/antd.css';
import './App.css';
import TicTacTou from './TicTacTou/TicTacTou';
import HomePage from './HomePage/HomePage';


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
              <Link to="/tictactou">
                <Icon type="table" />
                Gra - kółko krzyżyk
              </Link>
            </Menu.Item>
            <Menu.Item disabled>
                <Icon type="lock" />
                Niespodzianka
            </Menu.Item>
          </Menu>
        </div>

        <div className="container">
          <Route path="/" exact component={HomePage} />
          <Route path="/tictactou" component={TicTacTou} />
        </div>
      </Router>
      </>
    );
  }
  
}

export default App;
