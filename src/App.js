import './App.css';
import {HashRouter as BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import HomePage from './components/Home';
import { useEffect,useState } from 'react';
import Favorites from './components/Favorites';




function App() {
  const[homeButton,setHomeButton]=useState('rgb(169, 169, 238)');
  const[favoritesButton,setFavoritesButton]=useState('');
  

  
  const[cityName,setCityName] = useState('Tel Aviv');
  const[cityKey,setCityKey]=useState('215854');
  const[autocompleteSearch,setAutocompleteSearch]=useState([])
  const[currentWeather,setCurrentWeather]=useState([25,'C'])
  const[iconNum,setIconNum]=useState('')
  const[weeklyWeather,setWeekyWeather]=useState([{Temperature:{Minimum:{Value:''}}},{Temperature:{Minimum:{Value:''}}},{Temperature:{Minimum:{Value:''}}},{Temperature:{Minimum:{Value:''}}},{Temperature:{Minimum:{Value:''}}}])
  const[favoriteList,setFavoriteList]=useState([])
  const[favoriteListIndicator,setFavoriteListIndicator]=useState('white')
  const [buttonStatment,setbuttonStatment]=useState('Add to Favorite')
  const [selectedCity,setSelectedCity] = useState('Tel Aviv')

  const apiKey='4hJogyXl0T65zjMMS39LMqSp6XsPyc7E';
  const AutocompleteSearch =`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`;
  const DailyForecasts=`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
  const weeklyForecasts=`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`


  /// get Autocomplete search + key 
  
  useEffect(()=>{
   fetch(AutocompleteSearch).then(response =>response.json()).catch((err)=>{if(err) throw alert("city no exsist")}).then(data=>{setAutocompleteSearch(data)})
  },[cityName])



  ///get current weather
   useEffect(()=>{
  
  fetch(DailyForecasts)
  .then(response => response.json()).catch((err)=>{if(err) throw console.log(err)}).then(currentWeatherData =>{console.log(currentWeatherData[0].Temperature.Metric.Value,currentWeatherData[0].Temperature.Metric.Unit); setCurrentWeather([currentWeatherData[0].WeatherText ,currentWeatherData[0].WeatherIcon, currentWeatherData[0].Temperature.Metric.Value ,currentWeatherData[0].Temperature.Metric.Unit]);setIconNum(currentWeatherData[0].WeatherIcon)})
  },[cityKey])

  /// 5 days weather
  useEffect(()=>{
    fetch(weeklyForecasts).then(respons=>respons.json()).catch((err)=>{if(err) throw console.log(err)}).then(weeklyData=>{setWeekyWeather(weeklyData.DailyForecasts)})
  },[cityKey])
 

// add to favorites
  const addFavorite= (Key,name,Temperature,)=>{
    let tempObject = {
      Key:Key,
      NameOfCity:name,
      Temperature:Temperature,
      
    }
    setFavoriteList([...favoriteList,tempObject])
  }
    
  /// delete from favorites
  const deleteFavoriteCity=(index)=>{
   let afterFilter = favoriteList.filter((val,i)=>(i !== index))
   setFavoriteList([...afterFilter])

  }  

  return (
    <div className="App">

      <BrowserRouter>
        <div className="headerWebDiv">
          <p id='titleWeb'>Herolo Weather Task</p>

          <div id="headerButtons">

            <button style={{ backgroundColor: homeButton }} className="headerButton" onClick={() => {
              setHomeButton('rgb(169, 169, 238)')
              setFavoritesButton('')
            }}><Link to='/' onClick={()=>{
              setSelectedCity('Tel Aviv')
              setCityKey('215854')
              if(favoriteList.length > 0){
                let counter = 0
                favoriteList.map((val,i)=>{
                  if(favoriteList[i].Key === "215854"){
                    counter++
                    
                  }
                  
                })
                if(counter === 1){
                  setFavoriteListIndicator('red')
                  setbuttonStatment('Remove favorite')
                }else setFavoriteListIndicator('white'); setbuttonStatment('add to favorite')
              }
            }}>Home</Link></button>

            <button style={{ backgroundColor: favoritesButton }} className="headerButton" onClick={() => {
              setHomeButton('')
              setFavoritesButton('rgb(169, 169, 238)')
            }}><Link to='/Favorites'>Favorites</Link></button>
          </div>

        </div>
        <Routes>
          <Route path='/' element={<HomePage iconNum={iconNum} selectedCity={selectedCity} setSelectedCity={setSelectedCity} buttonStatment={buttonStatment} setbuttonStatment={setbuttonStatment} deleteFavoriteCity={deleteFavoriteCity} setFavoriteListIndicator={setFavoriteListIndicator} favoriteListIndicator={favoriteListIndicator} favoriteList={favoriteList} addFavorite={addFavorite} weeklyWeather={weeklyWeather} currentWeather={currentWeather} cityKey={cityKey} setCityKey={setCityKey} setCityName={setCityName} cityName={cityName} autocompleteSearch={autocompleteSearch} setAutocompleteSearch={setAutocompleteSearch} />} />
          <Route path='/favorites' element={<Favorites setFavoriteListIndicator={setFavoriteListIndicator} setSelectedCity={setSelectedCity} setCityKey={setCityKey} favoriteList={favoriteList}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
