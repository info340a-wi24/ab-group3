'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import { RenderPost } from '../objects/RenderPost';

export function Profile(props) {
    let profileInfo = useParams().profileId;
    let restaurantId = profileInfo.match(/^\d+/);

    let [photos, setPhotos] = useState([]);
    let [isFollowing, setFollowing] = useState(false);

    useEffect(() => {
        let db = getDatabase();
        let photosRef = ref(db, "photos");

        let unregisterFunction = onValue(photosRef, (snapshot) => {
            let photosValue = snapshot.val();
            let photosKeys = Object.keys(photosValue);

            let photosArray = photosKeys.map((key) => {
                let singlePhoto = {...photosValue[key]};
                return singlePhoto;
            })
            setPhotos(photosArray);
        });

        function cleanup() {
            unregisterFunction();
        }
        return cleanup;
    }, [restaurantId])

    useEffect(() => {
        let db = getDatabase();
        let followRef = ref(db, "users/" + props.uid + "/following");

        let unregisterFunction = onValue(followRef, (snapshot) => {
            let followValue = snapshot.val();
            if (followValue != undefined) {
                let followArray = Object.keys(followValue);
                followArray.forEach((index) => {
                    if (index == restaurantId[0]) {
                        setFollowing(true);
                    }
                })
            }
        })

        function cleanup() {
            unregisterFunction();
        }

        return cleanup;
    }, [restaurantId[0]]);

    let db = getDatabase();

    let restaurantRef = ref(db, "restaurants/" + restaurantId);
    let restaurant = {};
    onValue(restaurantRef, (snapshot) => {
        restaurant = snapshot.val();
    })

    let pfp = restaurant.cover_pic;
    let hours = restaurant.hours;
    let website = restaurant.website;
    let phone = restaurant.phone;
    let displayPhone = phone;
    if (displayPhone != undefined) {
        displayPhone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    }
    let location = restaurant.location;
    let restaurantName = restaurant.restaurant_name;
    let followers = restaurant.followers;

    let profileArray = [];
    for (let i = 0; i < photos.length; i++) {
        if (photos[i].restaurant_id == restaurantId) {
            profileArray.push(<RenderPost key={i} post={{...photos[i]}} savePost={props.savePost} likePost={props.likePost} />);
        }
    }

    let followRestaurant = () => {
        setFollowing(!isFollowing);
        props.followRestaurant(restaurantId[0]);
    }

    return (
        <div className="profile-display">
            <section className="flex-container profile-page">
                <div className="flex-container profile-banner">
                    <div className="flex-container profile-container">
                        <div className="profile-pic">
                            <img src={pfp} alt={restaurantName + " profile picture"} />
                        </div>
                        <h1>{restaurantName}</h1>
                        <h2>Followers: {followers}</h2>
                    </div>
                    <div className='follow-box'>
                        {!isFollowing && <button type="button" className="NomNom-button unclicked" onClick={followRestaurant}>Follow</button>}
                        {isFollowing && <button type="button" className="NomNom-button unfollow clicked" onClick={followRestaurant}>Following</button>}
                    </div>
                </div>
                <div className="flex-container post-list post-storage">
                    {profileArray}
                </div>
            </section>
            <div className="flex-container profile-details">
                <div className="profile-link">
                    <section>{"Open: "+ hours}</section>
                </div>
                <div className="flex-container profile-link">
                    <a href={"https://" + website} target="_blank">{website}</a>
                </div>
                <div className="flex-container profile-link">
                    <a href={"tel:" + phone}>{displayPhone}</a>
                </div>
                <div className="flex-container profile-link">
                    <a href={"https://www.google.com/maps/place/" + location} target="_blank">
                        {location}
                    </a>
                </div>
            </div>
        </div>
    )
}