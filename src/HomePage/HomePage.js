import React from 'react';
import { Button } from 'antd';
import './HomePage.css';
import lang from '../files/lang.json';
import MapContainer from '../MapContainer/MapContainer';



class HomePage extends React.Component {
    constructor() {
        super();
        this.state={
            isShowMap:false
        }

    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
        });
       
    }

    toggleShowMap() {
        this.setState({
            isShowMap: !this.state.isShowMap
        })
      }
    
    render() {
        return (
            <>
            <div className="home-container">   
                <h1>{lang[localStorage.getItem('lang')].homeTitle}</h1>
                <Button type="primary" onClick={this.toggleShowMap.bind(this)}>Moja lokalizacja</Button> 
                <div className={this.state.isShowMap ? "map-modal": "map-modal-hide"}>
                    { <MapContainer  />}
                </div>
            </div>
            
            
            
            </>
        );
    }
}

export default HomePage;