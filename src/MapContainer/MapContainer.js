import React from 'react'
import L from 'leaflet';
import './MapContainer.css';


class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.coordinate = {
            latitude: this.props.latitude,
            longitude: this.props.longitude
        }
    }

    componentDidMount() {
      let myMap = L.map('map-id', {
        center: [this.coordinate.latitude, this.coordinate.longitude],
        zoom: 15,
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }),
        ]
      });
     
      let marker = L.marker([this.coordinate.latitude, this.coordinate.longitude]).addTo(myMap);
      marker.bindPopup("<b>Moje miejsce na mapie :)</b>").openPopup();
    }
  
    render() {
        return <div id="map-id" className="map-container"></div>
    }
}
    

export default MapContainer;
