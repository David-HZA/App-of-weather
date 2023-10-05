import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  useEffect(() => {

    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      }
      setCoords(obj)
    }

    // Esto hace el llamado a la api del navegador, para usar la ubicacion actual
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //  ---------- Peticion del clima ------------

  useEffect(() => {
    if (coords) {
      const APIKEY = "2c339a05e27c901772c51286e283b13d"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(URL)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(0)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(0)
          setTemperature({ celsius, fahrenheit })
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])


  return (
    <div className="App">
      {weather ?
        <WeatherCard weather={weather} temperature={temperature} />
        :
        <Loading />
      }
    </div>
  )
}

export default App
