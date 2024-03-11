'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import { RenderPost } from './RenderPost';

export function Profile(props) {
    let restaurantName = useParams().profileId;
    let [restaurants, setRestaurants] = useState([]);
    let [photos, setPhotos] = useState([]);

    useEffect(() => {
        let db = getDatabase();
        let photosRef = ref(db, "photos");

        let unregisterFuntion = onValue(photosRef, (snapshot) => {
            let photosValue = snapshot.val();
            let photosKeys = Object.keys(photosValue);

            let photosArray = photosKeys.map((key) => {
                let singlePhoto = {...photosValue[key]};
                return singlePhoto;
            })
            setPhotos(photosArray);
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

    let restaurant = {};
    for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].restaurant_name == restaurantName) {
            restaurant = restaurants[i];
            break;
        }
    }

    let pfp = restaurant.cover_pic;
    let hours = restaurant.hours;
    let website = restaurant.website;
    let phone = restaurant.phone;
    let displayPhone = phone;
    if (displayPhone != undefined) {
        displayPhone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    }
    let location = restaurant.location;

    let profileArray = [];
    for (let i = 0; i < photos.length; i++) {
        if (photos[i].restaurant_name == restaurantName) {
            profileArray.push(<RenderPost post={{...photos[i]}} />);
        }
    }

    return (
        <div class="grid">
            <section class="flex-container profile-page">
                <div class="flex-container profile-banner">
                    <div class="flex-container profile-container">
                        <div class="profile-pic">
                            <img src={pfp} alt={restaurantName + " profile picture"} />
                        </div>
                        <h1>{restaurantName}</h1>
                        <h2>Followers: 8</h2>
                    </div>
                    <div class="follow-box">
                        <button type="button" class="NomNom-button">Follow</button>
                    </div>
                </div>
                <div className="flex-container post-list post-storage">
                    {profileArray}
                </div>
            </section>
            <div class="flex-container profile-details">
                <div class="profile-link">
                    <section>{"Open: "+ hours}</section>
                </div>
                <div class="flex-container profile-link">
                    <a href={"https://" + website} target="_blank">{website}</a>
                </div>
                <div class="flex-container profile-link">
                    <a href={"tel:" + phone}>{displayPhone}</a>
                </div>
                <div class="flex-container profile-link">
                    <a href={"https://www.google.com/maps/place/" + location} target="_blank">
                        {location}
                    </a>
                </div>
            </div>
        </div>
    )
}