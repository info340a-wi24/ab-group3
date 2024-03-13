'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export function RenderRestaurant(props) {
    let restaurant = props.restaurant;
    
    let src = restaurant.cover_pic;
    let restaurantName = restaurant.restaurant_name;
    let restaurantId = restaurant.restaurant_id;

    return (
        <figure className="restaurant-figure">
            <Link to={"/" + restaurantId + " " + restaurantName}>
                <img src={src} alt={restaurantName} />
                <figcaption>{restaurantName}</figcaption>
            </Link>
        </figure>
    )
}