import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [city,setCity] = useState("Mumbai");
  const [weatherdata, setWeatherdata]=useState(null);

  const currentDate  = new Date();
   const months= [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month=months[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();
  
  const fullDate=`${month} ${date}, ${year}`
 
 const API_key = "383fb6099e293b402252cd77ec2d0565"

 const fetchWeatherData = async ()=>{
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
    const data = await response.json()
    console.log(data)
    setWeatherdata(data)
    
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(()=>{
   fetchWeatherData();
 },[])

 const handleInputChange =(event)=>{
   console.log(event.target.value);
   setCity(event.target.value);
 }
 const handleSubmit =(event )=>{
      event.preventDefault();
      fetchWeatherData();
 }
const getWeatherIconUrl= (main)=>{
   switch(main){
     case "Clear":
      return "sun.png";
     case "Rain":
      return 'rain_with_cloud.png';
    case "snow":
      return "snow.png";
     case "Haze":
      return 'sun.png';
      case "Mist":
        return "thunder.png";
      default:
        return null
   }
}
  return (
    <>
      <div className='container'>
         {weatherdata && (
          <>
           <h1 className='container_date'>{fullDate}</h1>
           <div className='weather_data'>
             <h2 className='container_city'>{weatherdata.name}</h2>
             <img className="container_img" src={getWeatherIconUrl(weatherdata.weather[0].main)} width="180px" alt="Weather Icon" />
            
             {/* <img  className="container_img" src="./thunder.webp" alt="" /> */}
             <h2 className='container_degree'> {weatherdata.main.temp}</h2>
             <h2 className='country_per'>{weatherdata.weather[0].main}</h2>
             <form action="" className='form' onSubmit={handleSubmit}>
               <input type="text" className='input' placeholder='Enter City Name' onChange={handleInputChange}/>
               <button type='submit'>Get</button>
             </form>
           </div>
           </>
           
         )}

      </div>
        
    </>
  )
}

export default App
