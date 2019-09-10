import React from 'react';
import './HomePage.css';
import lang from '../files/lang.json';


class HomePage extends React.Component {
    render() {
        return (
            <div className="home-container">
                <h1>{lang[localStorage.getItem('lang')].homeTitle}</h1>
            </div>
        );
    }
}

export default HomePage;