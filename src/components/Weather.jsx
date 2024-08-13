import { useState ,useRef ,  useEffect } from "react";
import React from 'react'
import  './Weather.css';
import search_icon from '../assets/search.webp';
import cloud_icon from '../assets/cloud.jpeg';
import rain_icon from '../assets/rain.jpeg';
import snow_icon from '../assets/snow.jpeg';
import sun_icon from '../assets/sun.jpeg';
import wind_icon from '../assets/wind.jpeg';
import humidity_icon from '../assets/humidity.jpg';

const Weather = () => {

  const inputRef = useRef();
  const[weatherData , setWeatherData]=useState(false);

  const allIcons ={
    "01d":sun_icon,
    "01n":sun_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":sun_icon,
    "04n":sun_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }

    const search = async(city) =>{

      if(city==""){
        alert("Enter City Name");
        return;
      }
      try{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city }&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response=await fetch(url);
        const data=await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || sun_icon;
        setWeatherData({
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            temperature:Math.floor(data.main.temp),
            location:data.name,
            icon:icon
        })

      } catch (error){
        setWeatherData(false);
        console.error("Error in fetching weather data");

      }
    }

    useEffect(()=>{
      search("New York");
    },[])
  return (
    <div className="weather">
      <div className="search-bar">
         <input ref={inputRef} type="text" placeholder="search"/>
         <img src={search_icon} alt=" " width="3%" height="3%" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {weatherData? <>

      </>:<></>}

      <img src={weatherData.icon}  alt=" "  className="weather-icon" />
      <p className='temperature'>{weatherData.temperature}° c</p>
      <p className="location">{ weatherData.location}</p>

      <div className="weather-data">
      <div className="col">
      <img src={humidity_icon} alt=" " width="30%" height="40%"/>
      <div>
      <p>{weatherData.humidity}%</p>
      <p>Humidity</p>
      </div>
      </div>
    

      <div className="col">
      <img src={wind_icon} alt=" " width="30%" height="30%"/>
        <div>
        <p>{weatherData.windSpeed} km/h</p>
        <span>Wind Speed</span>
        </div>
      </div>
      </div>
    </div>
     

     
  )
}

export default Weather
