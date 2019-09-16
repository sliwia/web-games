import React from 'react'
import L from 'leaflet';
import './MapContainer.css';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.coordinate = {
            latitude: 51.226021,
            longitude: 22.604661
        }
    }
    componentDidMount() {
      this.map = L.map('map', {
        center: [this.coordinate.latitude, this.coordinate.longitude],
        zoom: 17,
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }),
        ]
      });
      L.marker([this.coordinate.latitude, this.coordinate.longitude]).addTo(this.map);
    }
  
    render() {
      return <div id="map" className="map-container"></div>
    }
  }
    

export default MapContainer;
