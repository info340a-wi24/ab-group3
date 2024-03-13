'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import { RenderRestaurant } from '../../miscellaneous/objects/RenderRestaurant';

export function Following(props) {
    let uid = props.uid;

    let [following, setFollowing] = useState([]);
    let [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        let db = getDatabase();
        let followingRef = ref(db, "users/" + uid + "/following");

        let unregisterFuntion = onValue(followingRef, (snapshot) => {
            let followingValue = snapshot.val();
            if (followingValue != null) {
                let followingKeys = Object.keys(followingValue);

                let followingArray = followingKeys.map((key) => {
                    let singlefollowing = followingValue[key];
                    return singlefollowing;
                })
                setFollowing(followingArray);
            }
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [])

    useEffect(() => {
        let db = getDatabase();
        let restaurantsRef = ref(db, "restaurants");

        let unregisterFuntion = onValue(restaurantsRef, (snapshot) => {
            let restaurantsValue = snapshot.val();
            let restaurantsKeys = Object.keys(restaurantsValue);

            restaurantsKeys = restaurantsKeys.filter((key) => {
                let filterKey = false;
                following.forEach((num) => {
                    if (key == num) filterKey = true;
                });
                return filterKey;
            });

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
    }, [restaurants])

    let followingArray = [];
    for (let i = 0; i < restaurants.length; i++) {
        followingArray.push(<RenderRestaurant key={i} restaurant={{...restaurants[i]}} />);
    }

    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discover" className="NomNom-button">Discover</Link>
                <Link to="../eats" className="NomNom-button">Eats</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../following" id="chosen-option" className="NomNom-button">Following</Link>
            </div>
            <div className="flex-container post-list restaurant-list">
                {followingArray}
            </div>
        </>
    );
}