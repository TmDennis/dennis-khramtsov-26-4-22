import React, { useState } from 'react'
import '../Style/HomePage.css'
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";



export default function Home(props) {
    const [city, setCity] = useState([props.sutocompleteSearch]);
    // const [selectedCity, setSelectedCity] = useState('Tel Aviv')
    


     /// chenge the color and button name and add to favorits
    const checkIfHeatIsRed=()=>{
             let counter= 0;
             let index = 0;
            if(props.favoriteList.length === 0){
                props.addFavorite(props.cityKey,props.selectedCity,props.currentWeather[2],)
                props.setFavoriteListIndicator('red')
                props.setbuttonStatment('Remove from favorite')
            }
            else props.favoriteList.map((val,i)=>{
               if(props.favoriteList[i].Key === props.cityKey){
                  counter++
                  index=i
               }
            })
            if(counter === 0){
                props.addFavorite(props.cityKey,props.selectedCity,props.currentWeather[2],)
                props.setFavoriteListIndicator('red')
               props.setbuttonStatment('Remove favorite')
            }
            if(counter === 1){
                props.deleteFavoriteCity(index)
                props.setFavoriteListIndicator('white')
                props.setbuttonStatment('add to Favorite')
            }
            
       

        
    }


    // 
    return (
        <div className='HomePage'>
            <div className='searchDiv'>
                <AiOutlineSearch id='SearchIcon' />
                <input id='searchInput' type={'search'} placeholder={` Search city...`} onChange={(e) => { var letter = /^[A-Za-z\s]+$/; if (letter.test(e.target.value) === true) { props.setCityName(e.target.value) } if (letter.test(e.target.value) !== true) { alert('letters must be in english'); e.target.value = ''; }; if (e.target.value === "") { props.setAutocompleteSearch([]) }; }} />
                {props.autocompleteSearch.map((i) => {
                    if (i.LocalizedName !== props.cityName) {
                        return <div className='suggestionList' onClick={(e) => { props.setCityKey(i.Key); props.setAutocompleteSearch([]); props.setSelectedCity(i.LocalizedName)
                         if(props.favoriteList.length > 0){
                             let counter = 0;
                            props.favoriteList.map((val,index)=>{
                                if(props.favoriteList[index].Key === i.Key){
                                    counter++;
                                }
                                
                            })
                            if(counter === 1){
                                props.setFavoriteListIndicator('red')
                                props.setbuttonStatment('Remove favorite')
                            }else props.setFavoriteListIndicator('white'); props.setbuttonStatment('add to favorite')
                         }
                        }} style={{ position: "relative", top: '20px', backgroundColor: 'white', border: "1px solid black", cursor: "pointer",  zIndex:'10'   }}>{i.LocalizedName}</div>
                    }

                })}
            </div>



            <div className='WeatherInfo'>
                <div id='currentWeatherDiv'>
                    <div id='imagCurrent'>
                        {/* icon from server */}
                        <img src={`https://www.accuweather.com/images/weathericons/${props.iconNum}.svg`} id='icon'/>
                        <p id='nameOfCity'>{props.selectedCity}</p>
                        <p id='temperature'>{props.currentWeather[2]} {props.currentWeather[3]} </p>
                    </div>

                </div>
                <div className='addToFavoritesDiv'>             
                    <button onClick={() => { checkIfHeatIsRed()  }} id='favoriteButton'>{props.buttonStatment}</button>
                    <AiOutlineHeart id='heartIcon'  style={{ backgroundColor:props.favoriteListIndicator, borderRadius: '100%' }} />

                </div>

                <h1 id='weatherText'>{props.currentWeather[0]}</h1>
                {/* 5 days weather */}
                <div id='weeklyDiv' >
                
                  <div className='weeklyWeather'>
                       <p>sun</p>
                      <p>{props.weeklyWeather[0].Temperature.Minimum.Value}F</p>
                  </div>
                  <div className='weeklyWeather'>
                       <p>mon</p>
                      <p>{props.weeklyWeather[1].Temperature.Minimum.Value}F</p>

                  </div>
                  <div className='weeklyWeather'>
                       <p>tue</p>
                      <p>{props.weeklyWeather[2].Temperature.Minimum.Value}F</p>

                  </div>
                  <div className='weeklyWeather'>
                       <p>wed</p>
                      <p>{props.weeklyWeather[3].Temperature.Minimum.Value}F</p>

                  </div>
                  <div className='weeklyWeather'>
                       <p>tue</p>
                      <p>{props.weeklyWeather[4].Temperature.Minimum.Value}F</p>

                  </div>

                </div>
               
            </div>
        </div>
    )
}
