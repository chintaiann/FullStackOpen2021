import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Country = ({country}) => {
    const [weather,setWeather] = useState(null);
    useEffect(() => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital
        };

        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => setWeather(response.data.current));
    }, [country]);
    return (
        <div>
            {country.name} <br></br>
            {country.capital} <br></br>
            Population : {country.population} <br></br>
            Languages : 
            <ul>
                {country.languages.map(i => 
                    <li>{i.name}</li>)}
            </ul>

            <img src={country.flag} height='400' wdith='400'></img>
                    
            <div>
        <h2>Weather in {country.capital}</h2>
            {
                weather ?
                <>
                    <p><strong>Temperature:</strong> {weather.temperature} celcius</p>
                    <img src={weather.weather_icons[0]} alt='Weather icon' />
                    <p><strong>Wind:</strong> {weather.wind_speed} mph, direction {weather.wind_dir}</p>
                </>
                :
                <p>Loading weather data...</p>
            }
        </div>

        </div>
    )
}

export default Country