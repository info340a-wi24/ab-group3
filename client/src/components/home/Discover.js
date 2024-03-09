'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import _ from 'lodash';

function useWindowWidth() {
    let [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        function updateWidth() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
}

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
                    <img src="img/heart.png" class="icon heart" />
                    <img src="img/heart-filled.png" class="icon heart-filled" />
                </div>
            </div>
        </div>
    );
}

function CreateColumn(props) {
    let postsArray = props.postsArray;

    let index = 0;
    let postsColumn = [];
    postsArray.forEach((post) => {
        postsColumn.push(<CreatePost key={index} post={{...postsArray[index]}} />);
        index++;
    })
    
    return (
        <div className="flex-container column-box">
            {postsColumn}
        </div>
    );
}

export function Discover(props) {
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

    let screenWidth = useWindowWidth();
    let numCol = 1;
    if (screenWidth > 591) {
        numCol++;
    }
    if (screenWidth > 879) {
        numCol++;
    }
    if (screenWidth > 1167) {
        numCol++;
    }
    if (screenWidth > 1455) {
        numCol++;
    }

    let dynamicColumns = [];

    if (numCol == 1) {
        dynamicColumns = <CreateColumn postsArray={photos} />
    } else {
        let arrayColumns = _.chunk(photos, photos.length / numCol);
        for (let i = 0; i < numCol; i++) {
            if (arrayColumns[i] != undefined) {
                dynamicColumns.push(<CreateColumn key={i} postsArray={[...arrayColumns[i]]} />);
            }
        }
    }

    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discovery" id="chosen-option" className="NomNom-button">Discover</Link>
                <Link to="../following" className="NomNom-button">Following</Link>
                <Link to="../saved" className="NomNom-button">Saved</Link>
                <Link to="../recent" className="NomNom-button">Recent</Link>
            </div>
            <div class="flex-container post-list">
                {dynamicColumns} 
            </div>
        </>
    );
}