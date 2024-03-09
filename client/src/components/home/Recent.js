'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function CreatePost(props) {
    let post = props.post;

    let src = post.src;
    let alt = post.alt;
    let restaurantName = post.restaurant_name;

    return (
        <div className="flex-container post">
            <div className="flex-container post-interaction">
                <div>
                    <div className="bookmark"></div>
                </div>
            </div>
            <a href="openpost.html" className="flex-container">
                <img src={src} alt={alt} />
            </a>
            <div className="flex-container restaurant-name">
                <p>{restaurantName}</p>
                <div className="heart-container">
                    <img src="img/heart.png" className="icon heart" />
                    <img src="img/heart-filled.png" className="icon heart-filled" />
                </div>
            </div>
        </div>
    );
}

export function Recent(props) {
    let [photos, setPhotos] = useState([]);

    useEffect(() => {
        let db = getDatabase();
        let photosRef = ref(db, "photos");

        let unregisterFuntion = onValue(photosRef, (snapshot) => {
            let photosValue = snapshot.val();
            let photosKeys = Object.keys(photosValue);

            let photosArray = photosKeys.map((key) => {
                let singlePhoto = { ...photosValue[key] };
                return singlePhoto;
            })
            setPhotos(photosArray);
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [])

    let recentArray = [];
    for (let i = 0; i < photos.length; i++) {
        recentArray.push(<CreatePost post={{...photos[i]}} />);
    }

    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discover" className="NomNom-button">Discover</Link>
                <Link to="../following" className="NomNom-button">Following</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../recent" id="chosen-option" className="NomNom-button">Recent</Link>
            </div>
            <div className="flex-container post-list post-storage">
                {recentArray}
            </div>
        </>
    );
}