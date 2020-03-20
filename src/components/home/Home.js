import React from 'react';
import { formatDate } from '../../utils/utils';
import { getCurrentWeatherByCoords } from '../../api/weather';

import './home.scss'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            coordsReady: false,
            lat: 0,
            lng: 0,
            date: formatDate(new Date()),
            weather: '',
        }
    }

    formatTemperature(temp){
        return Math.round(temp)
    }

    componentDidMount()
    {
        navigator.geolocation.getCurrentPosition((position) =>
        {
            // Get browser location before the weather API call
            this.setState(
            {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                coordsReady: true
            });

            // Get the Weather
            getCurrentWeatherByCoords(this.state.lat, this.state.lng)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    weather: result
                })
            })
        });
    }

    render()
    {
        if ( this.state.weather === '') { return null; }

        const temperature = this.formatTemperature(this.state.weather.main.temp);
        const realfeel = this.formatTemperature(this.state.weather.main.feels_like);

        return (
            <div className="home-page">
                <h1>{this.state.date}</h1>
                <h2>
                    The temperature is {temperature} &#8451;.
                    <br></br>
                    The real feel is {realfeel} &#8451; with a humiditiy level of {this.state.weather.main.humidity}%.
                    <br></br>
                    The weather outside is {this.state.weather.weather[0].description}.
                </h2>
            </div>
        )
    }
}

export default Home