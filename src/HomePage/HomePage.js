import React from 'react';
import { Button, Icon } from 'antd';
import './HomePage.css';
import lang from '../files/lang.json';
import MapContainer from '../MapContainer/MapContainer';


class HomePage extends React.Component {
    constructor() {
        super();
        this.state={
            isShowMap:false,
            latitude: null,
            longitude:null
        }
    }

    toggleShowMap() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            isShowMap: !this.state.isShowMap,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            })   
        });
    }
    
    render() {
        return (
            <>
            <div className="home-container">   
                <h1>{lang[localStorage.getItem('lang')].homeTitle}</h1>
                <Button type="primary" onClick={this.toggleShowMap.bind(this)}><Icon type="environment" />Moja lokalizacja</Button> 
                <div className={this.state.isShowMap ? "map-modal": "map-modal-hide"}>
                    { this.state.isShowMap ? <MapContainer {...this.state} /> : <></>}
                </div>
            </div>
            </>
        );
    }
}


export default HomePage;