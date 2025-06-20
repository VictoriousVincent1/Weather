import React, { useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import { useEffect } from 'react'


const Weather = () => {
    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "03n": cloud_icon,
        "04d": cloud_icon,
        "05n": cloud_icon,
        "06d": drizzle_icon,
        "07n": drizzle_icon,
        "08d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,

    }
    const search = async (city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon=allIcons[data.weather[0].icon]||clear_icon;
            setWeatherData({
                humidity:data.main.humidity, 
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon

            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching data");
        }
    }
    useEffect(()=>{
        ;
    },[])
  return (
    
        
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="search"/>
                <img src = {search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>
            {weatherData?<>
             <img src={clear_icon} alt="" className='weather-icon'/>
            <p className = 'temperature'>
                {weatherData.temperature} degrees celsius
            </p>
            <p className = 'location'>
                {weatherData.location}
            </p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}Km/h</p>
                        <span>Wind Speed</span>
                </div>
                </div>

            </div>
            </>:<></>}



           
        </div>
    
  )
}

export default Weather 
