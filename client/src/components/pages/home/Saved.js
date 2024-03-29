'use strict';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

import { RenderPost } from '../../miscellaneous/objects/RenderPost';

export function Saved(props) {
    let uid = props.uid;

    let [saved, setSaved] = useState([]);
    let [photos, setPhotos] = useState([]);

    useEffect(() => {
        let db = getDatabase();
        let savedRef = ref(db, "users/" + uid + "/saved");

        let unregisterFuntion = onValue(savedRef, (snapshot) => {
            let savedValue = snapshot.val();
            if (savedValue != null) {
                let savedKeys = Object.keys(savedValue);

                let savedArray = savedKeys.map((key) => {
                    let singleSaved = savedValue[key];
                    return singleSaved;
                })
                setSaved(savedArray);
            }
        });

        function cleanup() {
            unregisterFuntion();
        }
        return cleanup;
    }, [])

    useEffect(() => {
        let db = getDatabase();
        let photosRef = ref(db, "photos");

        let unregisterFuntion = onValue(photosRef, (snapshot) => {
            let photosValue = snapshot.val();
            let photosKeys = Object.keys(photosValue);
            photosKeys = photosKeys.filter((key) => {
                let filterKey = false;
                saved.forEach((num) => {
                    if (key == num) filterKey = true;
                });
                return filterKey;
            });

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
    }, [photos])

    let savedArray = [];
    for (let i = 0; i < photos.length; i++) {
        savedArray.push(<RenderPost key={i} post={{...photos[i]}} savePost={props.savePost} likePost={props.likePost} uid={uid} />);
    }

    return (
        <>
            <div className="flex-container home-option">
                <Link to="../discover" className="NomNom-button">Discover</Link>
                <Link to="../eats" className="NomNom-button">Eats</Link>
                <Link to="../saved" id="chosen-option" className="NomNom-button">Saved</Link>
                <Link to="../following" className="NomNom-button">Following</Link>
            </div>
            <div className="flex-container post-list post-storage">
                {savedArray}
            </div>
        </>
    );
}