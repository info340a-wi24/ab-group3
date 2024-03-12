'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function CreateRestaurant(props) {
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

export function Eats(props) {
    let [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        let db = getDatabase();
        let restaurantsRef = ref(db, "restaurants");

        let unregisterFuntion = onValue(restaurantsRef, (snapshot) => {
            let restaurantsValue = snapshot.val();
            let restaurantsKeys = Object.keys(restaurantsValue);

            let restaurantsArray = restaurantsKeys.map((key) => {
                let singleRestaurant = { ...restaurantsValue[key] };
                return singleRestaurant;
            })
            setRestaurants(restaurantsArray);
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [])

    let restaurantsArray = [];
    for (let i = 0; i < restaurants.length; i++) {
        restaurantsArray.push(<CreateRestaurant key={i} restaurant={{...restaurants[i]}} />);
    }

    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discover" className="NomNom-button">Discover</Link>
                <Link to="../eats" id="chosen-option" className="NomNom-button">Eats</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../following" className="NomNom-button">Following</Link>
            </div>
            <div className="flex-container post-list restaurant-list">
                {restaurantsArray}
            </div>
        </>
    );
}