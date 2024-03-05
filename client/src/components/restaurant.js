'use strict';
import React, {useState} from 'react';
import { sub } from 'server/router';


function RestaurantInfo({restaurantName, restaurantPic, subscribers, ratings}) {

    return (
        <div>
            <div>
                <img src={restaurantPic} alt={`Profile picture for ${restaurantName}`} id="profile" height="200px" width="300px"/>
            </div>
            <div className="profileR">
                <p>{restaurantName}</p>
            </div>
            <div className="sub">
                <p>Subscribers</p>
            <div className= "verticalR"></div>
            <p>{subscribers}</p>
            </div>
            <div className="rate">
                <a href="#yelp.review">Ratings {ratings}</a> 
            </div>
        </div>
        
    );
}

function RestaurantImgs({foodImg, hours, address}) {
    return (
        <div>
        <div className="flex-containerR">
            {foodImg.map((foodImg, index) => (
             <div className="flex-itemR" key={index}>
               <img src={foodImg.url} alt={foodImg.alt}/>
            </div>
            ))}
       </div>
       <div className="container">
   
           <div className="containerR">

               <div className="childR">
                   <div className="time">
                       <ul>
                            {hours.map((day, index) => (
                                <li key={index}>
                                    <p>{day.day}</p>
                           <ul>
                               <li>{day.hours}</li>
                               {day.closed && <p>Closed Now</p>}
                           </ul>
                                </li>
                            ))}
                       </ul>
                       <br/>
                       <div className="address">
                       <p>{address.street}</p>
                       <p>{address.city}, {address.state}, {address.zip}</p>
                       </div>
                       <br/>
                       <div>
                           <a href="#gogglemap.link">
                               <button className="map" type="button">Direction</button>
                           </a>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
    )
   
}

export {RestaurantInfo, RestaurantImgs};