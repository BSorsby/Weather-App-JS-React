import "./App.css";
// import { WeatherApp } from "./api";
import React, { useState } from 'react';

export function App() {

  let date = new Date();
  let fullDate = date.toDateString();

  const api = {
    key: "2a14bea25613c737675b9a657d9326a8",
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
  };

  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({ "coord": { "lon": -0.1257, "lat": 51.5085 }, "weather": [{ "id": 802, "main": "Clouds", "description": "", "icon": "03d" }], "base": "stations", "main": { "temp": '', "feels_like": 12.91, "temp_min": 11.98, "temp_max": 15, "pressure": 1020, "humidity": 65 }, "visibility": 10000, "wind": { "speed": 2.24, "deg": 302, "gust": 6.71 }, "clouds": { "all": 40 }, "dt": 1643731710, "sys": { "type": 2, "id": 2019646, "country": "", "sunrise": 1643701146, "sunset": 1643734135 }, "timezone": 0, "id": 2643743, "name": "", "cod": 200 });

  const handleChange = (event) => {
    setLocation(event.target.value);
  }

  const handleSubmit = () => {
    fetch(`${api.url}${location}&appid=${api.key}&units=metric`)
      .then((response) => 
      {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        }
        else {
          alert('Error: city not found, please enter a valid city.')
          throw Error(response.statusText);
        }
      })
      .then(result => {
        setWeather(result);
        setLocation("");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  let backgroundImg;
  let desc = weather.weather[0].description;
  if (desc.includes('clear sky')) {
    backgroundImg = 'sun';
  } else if (desc.includes('cloud')) {
    backgroundImg = 'cloud';
  } else if (desc.includes('snow')) {
    backgroundImg = 'snow';
  } else {
    backgroundImg = 'rain';
  }

  return (
    <div className={backgroundImg === 'sun' ? 'app-sun' : (backgroundImg === 'cloud' ? 'app-cloud' : (backgroundImg === 'snow' ? 'app-snow' : 'app-rain'))}>
      <input type="text" className="locationSearch" placeholder="Enter Location..." value={location} onChange={handleChange} onKeyPress={handleEnter} />
      <button onClick={handleSubmit}>Search</button>
      <div className="weatherContainer">
        <div className="location">{weather.name === '' ? ' ' : weather.name + ', ' + weather.sys.country}</div>
        <div className="temperature">{weather.main.temp === '' ? ' ' : Math.round(weather.main.temp) + '°C'}</div>
        <div className="weatherCondition">{weather.weather[0].description === '' ? ' ' : weather.weather[0].description}</div>
        <p className="todaysDate">{fullDate}</p>
      </div>
    </div>
  );
}


export default App;