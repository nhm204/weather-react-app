import { useCallback, useEffect, useState } from "react";

const api = {
  key: '439d4b804bc8187953eb36d2a8c26a02',
  base: 'https://openweathermap.org/data/2.5/weather'
}

function App() {
  const [ location, setLocation ] = useState('ho chi minh');
  const [ weather, setWeather ] = useState({});

  useEffect(() => {
    fetch(`${api.base}?q=${location}&appid=${api.key}`)
    .then(res => res.json())
    .then(res => {
      setWeather(res);
      setLocation('');
    })
  }, []);

  const searchLocation = useCallback((e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}?q=${location}&appid=${api.key}`)
      .then(res => res.json())
      .then(res => {
        setWeather(res);
        setLocation('');
      });
    }
  }, [location, setWeather, setLocation]);

  return (
    <div className="app">
      <header className="header">
        <input 
          className="searchbar" 
          type="text" 
          placeholder="Search location..." 
          value={location} 
          onChange={e => setLocation(e.target.value)} 
          onKeyPress={searchLocation} 
        />
      </header>
      <main className="container">
        <div className="top">
          <div>
            <div className="location">{weather.name}</div>
            {weather.main ? <h1 className="temp--celsius">{Math.round(weather.main.temp)}&deg;C</h1> : <h1 className="temp--celsius">No data</h1>}
            {weather.main ? <h2 className="temp--fahrenheit">{(weather.main.temp * (9 / 5) + 32).toFixed(2)}&deg;F</h2> : null}
          </div>
          <div className="top-right">
            {weather.weather ? <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather" width="150px"/> : null}
            {weather.weather ? <div className="description">{weather.weather[0].main} - {weather.weather[0].description}</div> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feel">
            {weather.main ? <p>{Math.round(weather.main.feels_like)}&deg;C</p> : null}
            Real Feel
          </div>
          <div className="humidity">
            {weather.main ? <p>{weather.main.humidity}%</p> : null}
            Humidity
          </div>
          <div className="wind">
            {weather.main ? <p>{weather.wind.speed} km/h</p> : null}
            Wind Speed
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
