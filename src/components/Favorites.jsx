import React from 'react'
import '../Style/HomePage.css'
import { useNavigate } from 'react-router-dom'

export default function Favorites(props) {
    const nav = useNavigate()
  return (
    <div className='FavoritesListDiv'>{console.log(props.favoriteList)}
        {props.favoriteList.map((value,i)=>{
          return <div className='FavoriteCity' onClick={()=>{props.setFavoriteListIndicator('red'); props.setSelectedCity(value.NameOfCity);props.setCityKey(value.Key); nav('/');  }} >
              <p>{value.NameOfCity}</p>
              <p>{value.Temperature}C</p>
              </div>
        })}
    </div>
  )
}
