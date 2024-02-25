import React, {useState} from 'react';

function RestaurantInfo() {

    return (
        <div>
            <div>
                <img src="img/Untitled_Artwork 15.PNG" alt="Profile picture for the resturant" id="profile" height="200px" width="300px"/>
            </div>
            <div className="profileR">
                <p>Restaurant_Name</p>
            </div>
            <div className="sub">
                <p>Subscribers</p>
            <div className= "verticalR"></div>
            <p>24</p>
            </div>
            <div className="rate">
                <a href="#yelp.review">Ratings 4.5</a> 
            </div>
        </div>
        
    );
}

function RestaurantImgs() {
    <div>
         <div className="flex-containerR">
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>
            <div className="flex-itemR">
                
            </div>  
            <div className="flex-itemR">
                
            </div>     
        </div>
        <div className="container">
    
            <div className="containerR">

                <div className="childR">
                    <div className="time">
                        <ul>
                            <p>Mon</p>
                            <ul>
                                <li>11:00 AM - 11:00 PM</li>
                                <p>Closed Now</p>
                            </ul>
                            <p>Tue</p>
                            <ul>
                                <li>11:00 AM - 11:00 PM</li>
                            </ul>
                            <p>Wed</p>
                            <ul>
                                <li>11:00 AM - 11:00 PM</li>
                            </ul>
                            <p>Thu</p>
                            <ul>
                                <li>11:00 AM - 11:00 PM</li>
                            </ul>
                            <p>Fri</p>
                            <ul>
                                <li>11:00 AM - 11:00 PM</li>
                            </ul>
                            <p>Sat</p>
                            <ul>
                                <li>11:00 AM - 11:00 PM</li>
                            </ul>
                            <p>Sun</p>
                            <ul>
                                <li>11:00 AM - 11:00 PM</li>
                            </ul>
                            
                        </ul>
                        <br/>
                        <div className="address">
                        <p>4106 Brooklyn Ave NE</p>
                        <p>Seattle, WA 98105</p>
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
}

export {RestaurantInfo, RestaurantImgs};