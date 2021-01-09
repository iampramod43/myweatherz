import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import ProgressBar from './ProgressBar';
import Hourly from './Hourly';
import moment from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocation, setLocation } from './features/locationSlice';
import Geocode from 'react-geocode';
import { setCity } from './features/citySlice';
import Row from './Row';
function App() {
  const [weather, setWeather] = useState({});
  const [rain, setRain] = useState('No Rain');
  const location = useSelector(selectLocation);
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      Geocode.setApiKey("AIzaSyCHEWyrrh4llmggFo6x4jgV0joBPniEVKU");
      Geocode.setLanguage("en");
      Geocode.setRegion("es");
      Geocode.enableDebug();
      Geocode.fromLatLng(pos.coords.latitude, pos.coords.longitude).then(
        res => {
          const address = res.results[0].formatted_address.split(',');
          dispatch(setCity(address[4]));
        },
        error => {
          console.error(error);
        }
      );
      dispatch(setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }));
    });

  }, []);
  useEffect(() => {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&units=metric&appid=55cd7066da977f58e69d3119e6c0e006`;  
  fetch(url)
    .then(res => res.json())
    .then((result) => {
      setWeather(result);
    });
  },[location]);

  if (weather && weather.current && weather.current.rain) {
    setRain(weather.current.rain);
  }
  return (
      <div className="app">
      <div className="appBody">
      <Search />
        <WeatherInfo
        lat={weather.lat}
        lon={weather.lon}
        city="Vidyagiri"
        dt={moment(weather.current?.dt * 1000).tz(weather.timezone)?.format('MMMM Do YYYY, h:mm a')}
        rise={moment(weather.current?.sunrise * 1000).tz(weather.timezone)?.format('LT')}
        set={moment(weather.current?.sunset * 1000).tz(weather.timezone)?.format('LT')}
        temp={weather.current?.temp}
        feelsLike={weather.current?.feels_like}
        climate={weather.current?.weather[0].description}
        icon={weather.current?.weather[0].icon}
        rain={rain}
        />
        <div className="app__progressBars">
          <ProgressBar title="Clouds" per={weather.current?.clouds}/>
          <ProgressBar title="Humdity" per={weather.current?.humidity}/>
          <ProgressBar title="UV Index" per={weather.current?.uvi}/>
        </div>
        {weather.hourly && (
          <div className="app__hourly">
          <Hourly time={moment(weather.hourly[weather.hourly?.length - 7]?.dt * 1000).tz(weather.timezone).format('LT')} image={weather.hourly[weather.hourly?.length - 7]?.weather[0].icon} desc={weather.hourly[weather.hourly?.length - 7]?.weather[0].description} />
          <Hourly time={moment(weather.hourly[weather.hourly?.length - 6]?.dt * 1000).tz(weather.timezone).format('LT')} image={weather.hourly[weather.hourly?.length - 6]?.weather[0].icon} desc={weather.hourly[weather.hourly?.length - 6]?.weather[0].description}/>
          <Hourly time={moment(weather.hourly[weather.hourly?.length - 5]?.dt * 1000).tz(weather.timezone).format('LT')} image={weather.hourly[weather.hourly?.length - 5]?.weather[0].icon} desc={weather.hourly[weather.hourly?.length - 5]?.weather[0].description}/>
          <Hourly time={moment(weather.hourly[weather.hourly?.length - 4]?.dt * 1000).tz(weather.timezone).format('LT')} image={weather.hourly[weather.hourly?.length - 4]?.weather[0].icon} desc={weather.hourly[weather.hourly?.length - 4]?.weather[0].description}/>
          <Hourly time={moment(weather.hourly[weather.hourly?.length - 3]?.dt * 1000).tz(weather.timezone).format('LT')} image={weather.hourly[weather.hourly?.length - 3]?.weather[0].icon} desc={weather.hourly[weather.hourly?.length - 3]?.weather[0].description}/>
          <Hourly time={moment(weather.hourly[weather.hourly?.length - 2]?.dt * 1000).tz(weather.timezone).format('LT')} image={weather.hourly[weather.hourly?.length - 2]?.weather[0].icon} desc={weather.hourly[weather.hourly?.length - 2]?.weather[0].description}/>
          <Hourly time={moment(weather.hourly[weather.hourly?.length - 1]?.dt * 1000).tz(weather.timezone).format('LT')} image={weather.hourly[weather.hourly?.length - 1]?.weather[0].icon} desc={weather.hourly[weather.hourly?.length - 1]?.weather[0].description}/>
        </div>
        )}
        <Row 
          day='Day'
          night='Night'
          min='Min'
          max='Max'
          morn='Morn'
          eve='Eve'
          />
        {weather.daily && (
          
          weather.daily.map(daily => (
            <Row daily={moment(daily.dt * 1000).tz(weather.timezone).format('dddd')}
              day={daily.temp.day}
              night={daily.temp.night}
              min={daily.temp.min}
              max={daily.temp.max}
              morn={daily.temp.morn}
              eve={daily.temp.eve}
            />
          ))
        )}
        
      </div>
    </div>
  );
}

export default App;
