import React, { Component } from "react"
import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"

import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class MyMap extends Component
{
    render()
    {
        return (
            <Map center={this.props.coords} zoom={14} style={{ width: '100%', height: '50vh' }}>
                <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                            attribution="&copy; <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors"
                            maxZoom="19"
                />
                <Marker position={this.props.coords}>
                    <Popup>You are Here!</Popup>
                </Marker>
            </Map>
        )
    }
}