'use strict';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export function RenderPost(props) {
    let post = props.post;

    let src = post.src;
    let alt = post.alt;
    let restaurantId = post.restaurant_id;
    
    let [restaurant, setRestaurant] = useState(" ");
    useEffect(() => {
        let db = getDatabase();
        let restaurantRef = ref(db, "restaurants/" + restaurantId);

        onValue(restaurantRef, (snapshot) => { 
            let restaurantValue = snapshot.val();
            setRestaurant(restaurantValue);
        })
    }, [])

    let restaurantName = "";
    if (restaurant != null) {
        restaurantName = restaurant.restaurant_name;
    }

    let savePost = () => {
        props.savePost(post.photo_id);
    }

    return (
        <div className="flex-container post">
            <div className="flex-container post-interaction">
                <div>
                    <div className="bookmark" onClick={savePost}></div>
                </div>
            </div>
            <Link to={"/discover/" + post.photo_id + restaurantName} onClick={window.scrollTo(0, 0)} className="flex-container">
                <img src={src} alt={alt} />  
            </Link>
            <div className='flex-container restaurant-container'>
                <div className='flex-container restaurant-name'>
                    <p>{restaurantName}</p>
                </div>
                <div className="heart-container">
                    <img src={"./../img/heart.png"} className="icon heart" />
                    <img src={"./../img/heart-filled.png"} className="icon heart-filled" />
                </div>
            </div>
        </div>
    );
}